db.resultado_cbo_div_uf_2023.aggregate([
  {
    $addFields: {
      ocupados: {
        $cond: {
          if: { $eq: ["$ocupados", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados", find: ",", replacement: "." } } }
        }
      },
    }
  },
  {
      $out: "resultado_cbo_div_uf_2023"
  }
])

