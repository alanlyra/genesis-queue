# FaixaSalarialSexo_Estado

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [FaixaSalarialSexo_Estado](./FaixaSalarialSexo_Estado.md)

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
    $match: {
      col_sexo_trabalhador: {
        $ne: -1
      }
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        faixaRemunMediaSM: "$faixaRemunMediaSM"
      },
	  faixaRemunMediaSM: { $first: "$faixaRemunMediaSM" },
      countMasculino: {
        $sum: {
          $cond: [
            {
              $eq: ["$col_sexo_trabalhador", 1]
            },
            1,
            0
          ]
        }
      },
      countFeminino: {
        $sum: {
          $cond: [
            {
              $eq: ["$col_sexo_trabalhador", 2]
            },
            1,
            0
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      faixaRemunMediaSM: 1,
      ocupacao: "$_id.ocupacao",
      countMasculino: 1,
      countFeminino: 1
    }
  },
  {
    $out: "FaixaSalarialSexo_Estado"
  }
]);
```