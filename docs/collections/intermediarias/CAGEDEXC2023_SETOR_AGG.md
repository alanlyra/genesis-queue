# CAGEDEXC2023_SETOR_AGG

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDEXC2023](../raizes/CAGEDEXC2023.md) > [CAGEDEXC2023_MOD](./CAGEDEXC2023_MOD.md) > [CAGEDEXC2023_SETOR_AGG](./CAGEDEXC2023_SETOR_AGG.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDEXC2023_MOD](../raizes/CAGEDEXC2023_MOD.md):

```
db.CAGEDEXC2023_MOD.aggregate([
  {
    $lookup: {
      from: "CNAE_div_agg",
      localField: "setor",
      foreignField: "divisao_cod",
      as: "cnae_data"
    }
  },
  {
    $addFields: {
      cnae_data: { $arrayElemAt: ["$cnae_data", 0] }
    }
  },
  {
    $addFields: {
      divisao_cod_agg: "$cnae_data.divisao_cod_agg"
    }
  },
  {
    $project: {
      cnae_data: 0
    }
  },
  {
      $out: "CAGEDEXC2023_SETOR_AGG"
  }
]);
```