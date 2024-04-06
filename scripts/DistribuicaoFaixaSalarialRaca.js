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
            estado: "$col_uf",
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
        estado: "$_id.estado",
        ocupacao: "$_id.ocupacao",
        faixaRemunMediaSM: 1,
        countBranco: 1,
        countPreto: 1,
        countPardo: 1
      }
    },
    {
      $out: "DistribuicaoFaixaSalarialRaca-Estado"
    }
])

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