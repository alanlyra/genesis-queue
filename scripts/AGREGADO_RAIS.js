db.getCollection("RAIS_2021").aggregate([
  {
    $addFields: {
      cnae: {
        $trunc: {
          $divide: ["$col_cnae_subclasse", 100000]
        }
      }
    }
  },
  {$out:"CNAE_RAIS"}
])

db.getCollection("CNAE_RAIS").aggregate([
  {
      $group: {
        _id: {UF: "$col_uf", ocupacao: "$col_cbo_2002", cnae: "$cnae"},
        UF: {$first: "$col_uf"},
        ocupacao: {$first: "$col_cbo_2002"},
        cnae: {$first: "$cnae"},
        salarioMedio: { $avg: "$col_remun_media_trabalhador" },
        empregados: {$sum: 1}
      }
    },
  {$out:"AGREGADO_RAIS"}
],  { allowDiskUse: true })

db.getCollection("AGREGADO_RAIS").aggregate([
  {
    $lookup: {
      from: "CNAE_div_agg",
      localField: "cnae",
      foreignField: "cnae",
      as: "matching_docs"
    }
  },
  {
    $unwind: "$matching_docs"
  },
  {
    $addFields: {
      divisao_cod_agg: "$matching_docs.divisao_cod_agg"
    }
  },
  {
    $project: {
      matching_docs: 0
    }
  },
  {$out:"AGREGADO_RAIS"}
])

db.getCollection("AGREGADO_RAIS").deleteMany({ocupacao: 0})

db.getCollection("AGREGADO_RAIS").aggregate([
  {
    $lookup: {
      from: "OCUPACOES",
      localField: "ocupacao",
      foreignField: "NU_CODIGO_CBO",
      as: "matching_docs"
    }
  },
  {
    $unwind: "$matching_docs"
  },
  {
    $addFields: {
      NM_OCUPACAO: "$matching_docs.NM_OCUPACAO"
    }
  },
  {
    $project: {
      matching_docs: 0
    }
  },
  {$out:"AGREGADO_RAIS"}
])

db.getCollection("AGREGADO_RAIS").aggregate([
  {
      $group: {
        _id: {UF: "$UF", ocupacao: "$ocupacaoCbo", divisao_cod_agg: "$divisao_cod_agg"},
        UF: {$first: "$UF"},
        ocupacao: {$first: "$ocupacaoCbo"},
        divisao_cod_agg: {$first: "$divisao_cod_agg"},
        salarioMedio: { $avg: "$salarioMedio" },
        empregados: {$sum: "$empregados"},
        NM_OCUPACAO: {$first: "$NM_OCUPACAO"}
      }
    },
  {$out:"AGREGADO_RAIS"}
],  { allowDiskUse: true })

db.getCollection("AGREGADO_RAIS").aggregate([
  {
    $lookup: {
      from: "PROB_AUTOMACAO",
      localField: "ocupacao",
      foreignField: "col_codigo_cbo",
      as: "matching_docs"
    }
  },
  {
    $unwind: {
      path: "$matching_docs",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $addFields: {
      col_prob_auto: {
        $cond: {
          if: { $eq: ["$matching_docs", []] },
          then: 0,
          else: "$matching_docs.col_prob_auto"
        }
      }
    }
  },
  {
    $project: {
      matching_docs: 0
    }
  },
  { $out: "AGREGADO_RAIS" }
]);