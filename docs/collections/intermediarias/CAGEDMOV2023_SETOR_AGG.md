# CAGEDMOV2023_SETOR_AGG

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDMOV2023](../raizes/CAGEDMOV2023.md) > [CAGEDMOV2023_MOD](./CAGEDMOV2023_MOD.md) > [CAGEDMOV2023_SETOR_AGG](./CAGEDMOV2023_SETOR_AGG.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDMOV2023_MOD](../raizes/CAGEDMOV2023_MOD.md):

```
db.CAGEDMOV2023_MOD.aggregate([
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
      $out: "CAGEDMOV2023_SETOR_AGG"
  }
]);
```