# PNADc_ocupados_numerico

## Fontes 

[SENAC](../../SENAC.md) > [PNADc_Ocupados](../raizes/PNADc_Ocupados.md) > [PNADc_ocupados_numerico](./PNADc_ocupados_numerico.md)

## Como gerar

1. Executar uma das duas agregação abaixo, dependendo da estrutura dos dados originais, sobre a coleção [PNADc_Ocupados](../raizes/PNADc_Ocupados.md):

```
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
```

```
db.getCollection("PNADc_ocupados").aggregate([
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
      ocupados_se: {
        $cond: {
          if: { $eq: ["$ocupados_se", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados_se", find: ",", replacement: "." } } }
        }
      },
      salario_medio: {
        $cond: {
          if: { $eq: ["$salario", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario", find: ",", replacement: "." } } }
        }
      },
      salario_medio_low: {
        $cond: {
          if: { $eq: ["$salario_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_low", find: ",", replacement: "." } } }
        }
      },
      salario_medio_upp: {
        $cond: {
          if: { $eq: ["$salario_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_upp", find: ",", replacement: "." } } }
        }
      },
      salario_medio_cv: {
        $cond: {
          if: { $eq: ["$salario_cv", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_cv", find: ",", replacement: "." } } }
        }
      },
      salario_medio_se: {
        $cond: {
          if: { $eq: ["$salario_se", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$salario_se", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio: {
        $cond: {
          if: { $eq: ["$tempo_emprego", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tempo_emprego", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_low: {
        $cond: {
          if: { $eq: ["$tempo_emprego_low", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tempo_emprego_low", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_upp: {
        $cond: {
          if: { $eq: ["$tempo_emprego_upp", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tempo_emprego_upp", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_cv: {
        $cond: {
          if: { $eq: ["$tempo_emprego_cv", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tempo_emprego_cv", find: ",", replacement: "." } } }
        }
      },
      tmp_emprego_medio_se: {
        $cond: {
          if: { $eq: ["$tempo_emprego_se", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$tempo_emprego_se", find: ",", replacement: "." } } }
        }
      },
    }
  },
  {
      $out: "PNADc_ocupados_numerico"
  }
])
```