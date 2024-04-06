# DistribuicaoFaixaSalarialRaca-Pais

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [DistribuicaoFaixaSalarialRaca-Pais](./DistribuicaoFaixaSalarialRaca-Pais.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
    {
        $match: {
          "col_vinculo_ativo_31_12": 1,
          "col_raca_cor": {$in: [2, 4, 8]}
        }
    },
    {
        $group: {
          _id: {
            ocupacao: "$col_cbo_2002",
            faixaRemunMediaSM: "$faixaRemunMediaSM"
          },
          faixaRemunMediaSM: { $first: "$faixaRemunMediaSM" },
          countBranco: {
            $sum: {
              $cond: [
                {
                  $eq: ["$col_raca_cor", 2]
                },
                1,
                0
              ]
            }
          },
          countPreto: {
            $sum: {
              $cond: [
                {
                  $eq: ["$col_raca_cor", 4]
                },
                1,
                0
              ]
            }
          },
          countPardo: {
            $sum: {
              $cond: [
                {
                  $eq: ["$col_raca_cor", 8]
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
        ocupacao: "$_id.ocupacao",
        faixaRemunMediaSM: 1,
        countBranco: 1,
        countPreto: 1,
        countPardo: 1
      }
    },
    {
      $out: "DistribuicaoFaixaSalarialRaca-Pais"
    }
])
```