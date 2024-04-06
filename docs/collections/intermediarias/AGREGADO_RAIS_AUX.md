# AGREGADO_RAIS_AUX

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [CNAE_RAIS](./CNAE_RAIS.md) > [AGREGADO_RAIS_AUX](./AGREGADO_RAIS_AUX.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CNAE_RAIS](./CNAE_RAIS.md):

```
db.getCollection("CNAE_RAIS").aggregate([
  {
    $match: {
      col_vinculo_ativo_31_12: 1
    }
  },
  {
    $group: {
      _id: { UF: "$col_uf", ocupacao: "$col_cbo_2002", cnae: "$cnae" },
      UF: { $first: "$col_uf" },
      ocupacao: { $first: "$col_cbo_2002" },
      cnae: { $first: "$cnae" },
      salarioMedio: { $avg: "$col_remun_media_trabalhador" },
      empregados: { $sum: 1 }
    }
  },
  {
    $set: {
      "_id.cnae": { $toInt: "$cnae" },
      cnae: { $toInt: "$cnae" },
      "_id.ocupacao": {$toString: "$ocupacao"},
      ocupacao: {$toString: "$ocupacao"}
    }
  },
  { $out: "AGREGADO_RAIS_AUX" }
], { allowDiskUse: true })
```

2. Executar correção dos códigos de ocupação por meio da seguinte agregação sobre a coleção [AGREGADO_RAIS_AUX](./AGREGADO_RAIS_AUX.md)

```
db.getCollection("AGREGADO_RAIS_AUX").aggregate([
  {
		$match: {ocupacao: { $exists: true }}	  
	},
  {
    $set: {
      ocupacao: {
        $cond: {
          if: { $lt: [ { $strLenCP: "$ocupacao" }, 6 ] },
          then: {
            $concat: [
              { $substrCP: ["000000", 0, { $subtract: [6, { $strLenCP: "$ocupacao" }] }] },
              "$ocupacao"
            ]
          },
          else: "$ocupacao"
        }
      }
    }
  },
  {
    $out: "AGREGADO_RAIS_AUX"
  }
])

```