# RaisTrabalhadorSalarial

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [RaisTrabalhadorSalarial](./RaisTrabalhadorSalarial.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
  {
    $match: {
      "col_vinculo_ativo_31_12": 1
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002"
      },
      count: { $sum: 1 },
      remuneracao: {$push: "$col_remun_media_trabalhador"}
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      remuneracao: 1,
      ocupacao: "$_id.ocupacao",
      count: 1,
    }
  },
  {
    $out: "RaisTrabalhadorSalarial"
  }
], { allowDiskUse: true });
```