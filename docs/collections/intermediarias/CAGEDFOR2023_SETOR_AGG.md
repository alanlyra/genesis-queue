# CAGEDFOR2023_SETOR_AGG

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDFOR2023](../raizes/CAGEDFOR2023.md) > [CAGEDFOR2023_MOD](./CAGEDFOR2023_MOD.md) > [CAGEDFOR2023_SETOR_AGG](./CAGEDFOR2023_SETOR_AGG.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDFOR2023_MOD](../raizes/CAGEDFOR2023_MOD.md):

```
db.CAGEDFOR2023_MOD.aggregate([
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
      $out: "CAGEDFOR2023_SETOR_AGG"
  }
]);
```