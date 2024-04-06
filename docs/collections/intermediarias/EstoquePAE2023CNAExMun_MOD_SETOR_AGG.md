# EstoquePAE2023CNAExMun_MOD_SETOR_AGG

## Fontes 

[SENAC](../../SENAC.md) > [EstoquePAE2023CNAExMun](../raizes/EstoquePAE2023CNAExMun.md) > [EstoquePAE2023CNAExMun_MOD](./EstoquePAE2023CNAExMun_MOD.md) > [EstoquePAE2023CNAExMun_MOD_SETOR_AGG](./EstoquePAE2023CNAExMun_MOD_SETOR_AGG.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [EstoquePAE2023CNAExMun_MOD](../intermediarias/EstoquePAE2023CNAExMun_MOD.md):

```
db.EstoquePAE2023CNAExMun_MOD.aggregate([
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
      $out: "EstoquePAE2023CNAExMun_MOD_SETOR_AGG"
  }
]);
```