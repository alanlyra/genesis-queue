# RAIS_2021_SETOR_MOD_AGG

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [RAIS_2021_SETOR](./RAIS_2021_SETOR.md) > [[RAIS_2021_SETOR_MOD](./RAIS_2021_SETOR_MOD.md), [CNAE_div_agg](../raizes/CNAE_div_agg.md)] > [RAIS_2021_SETOR_MOD_AGG](./RAIS_2021_SETOR_MOD_AGG.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021_SETOR_MOD](./RAIS_2021_SETOR_MOD.md):

```
db.RAIS_2021_SETOR_MOD.aggregate([
    {
        $lookup: {
            from: "CNAE_div_agg",
            localField: "setor",
            foreignField: "divisao_cod",
            as: "cnae_match"
        }
    },
    {
        $unwind: "$cnae_match"
    },
    {
        $addFields: {
            divisao_cod_agg: "$cnae_match.divisao_cod_agg"
        }
    },
    {
        $project: {
            cnae_match: 0
        }
    },
    { 
        $out: "RAIS_2021_SETOR_MOD_AGG" 
    }
]);
```