db.PNADc_ocupados.aggregate([
  {
    $addFields: {
      ocupados: {
        $cond: {
          if: { $eq: ["$ocupados", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados", find: ",", replacement: "." } } }
        }
      },
      ocupados_low: {
        $cond: {
          if: { $eq: ["$ocupados_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados_low", find: ",", replacement: "." } } }
        }
      },
      ocupados_upp: {
        $cond: {
          if: { $eq: ["$ocupados_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados_upp", find: ",", replacement: "." } } }
        }
      },
      ocupados_cv: {
        $cond: {
          if: { $eq: ["$ocupados_cv", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados_cv", find: ",", replacement: "." } } }
        }
      },
      salario_medio: {
        $cond: {
          if: { $eq: ["$salario_medio", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_medio", find: ",", replacement: "." } } }
        }
      },
      salario_medio_low: {
        $cond: {
          if: { $eq: ["$salario_medio_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_medio_low", find: ",", replacement: "." } } }
        }
      },
      salario_medio_upp: {
        $cond: {
          if: { $eq: ["$salario_medio_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_medio_upp", find: ",", replacement: "." } } }
        }
      },
      salario_medio_cv: {
        $cond: {
          if: { $eq: ["$salario_medio_cv", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_medio_cv", find: ",", replacement: "." } } }
        }
      },
      salario_mediana_low: {
        $cond: {
          if: { $eq: ["$salario_mediana_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_mediana_low", find: ",", replacement: "." } } }
        }
      },
      salario_mediana_upp: {
        $cond: {
          if: { $eq: ["$salario_mediana_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_mediana_upp", find: ",", replacement: "." } } }
        }
      },
      salario_mediana_cv: {
        $cond: {
          if: { $eq: ["$salario_mediana_cv", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_mediana_cv", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio: {
        $cond: {
          if: { $eq: ["$tmp_emprego_medio", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_medio", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_low: {
        $cond: {
          if: { $eq: ["$tmp_emprego_medio_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_medio_low", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_upp: {
        $cond: {
          if: { $eq: ["$tmp_emprego_medio_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_medio_upp", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_cv: {
        $cond: {
          if: { $eq: ["$tmp_emprego_medio_cv", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_medio_cv", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_mediana_low: {
        $cond: {
          if: { $eq: ["$tmp_emprego_mediana_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_mediana_low", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_mediana_upp: {
        $cond: {
          if: { $eq: ["$tmp_emprego_mediana_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_mediana_upp", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_mediana_cv: {
        $cond: {
          if: { $eq: ["$tmp_emprego_mediana_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tmp_emprego_mediana_cv", find: ",", replacement: "." } } }
        }
      },
    }
  },
  {
      $out: "PNADc_ocupados_numerico"
  }
])