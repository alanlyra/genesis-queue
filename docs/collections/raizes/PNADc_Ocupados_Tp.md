# PNADc_Ocupados_Tp

## Fontes 

[SENAC](../../SENAC.md) > [PNADc_ocupados_tp_totais](./PNADc_Ocupados_Tp.md)

## Como gerar

1. Baixar os dados provenientes do SENAC, detalhados no arquivo: 'Indicadores de Panorama do Mercado de Comércio e Serviços'. Pode ser necessário alterar tipos dos valores para inteiro, para isso use a agregação abaixo, considerando PNADc_ocupados_tp_string a coleção original:
```
db.getCollection("PNADc_ocupados_tp_string").aggregate([
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
    }
  },
  {
      $out: "PNADc_ocupados_tp_totais"
  }
])
```