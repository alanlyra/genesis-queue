# AGREGADO_RAIS_PNAD

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [CNAE_RAIS](../intermediarias/CNAE_RAIS.md) > [AGREGADO_RAIS_AUX](../intermediarias/AGREGADO_RAIS_AUX.md) > [AGREGADO_RAIS_PNAD](./AGREGADO_RAIS_PNAD.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [AGREGADO_RAIS_AUX](../intermediarias/AGREGADO_RAIS_AUX.md):

```
db.getCollection("AGREGADO_RAIS_AUX").aggregate([


  {
    $lookup: {
      from: "OCUPACOES",
      localField: "ocupacao",
      foreignField: "NU_CODIGO_CBO",
      as: "dadosOcupacao"
    }
  },
  {
    $unwind: "$dadosOcupacao"
  },
  {
    $project: {
      UF: 1,
      ocupacao: 1,
      cnae: 1,
      salarioMedio: 1,
      empregados: 1,
      NM_OCUPACAO: "$dadosOcupacao.NM_OCUPACAO"
    }
  },


  {
    $lookup: {
      from: "PROB_AUTOMACAO",
      localField: "ocupacao",
      foreignField: "col_codigo_cbo",
      as: "dadosAutomacao"
    }
  },
  {
    $unwind: "$dadosAutomacao"
  },
  {
    $project: {
      UF: 1,
      ocupacao: 1,
      cnae: 1,
      salarioMedio: 1,
      empregados: 1,
      NM_OCUPACAO: 1,
      col_prob_auto: "$dadosAutomacao.col_prob_auto"
    }
  },


  {
    $lookup: {
      from: "CNAE_div_agg",
      localField: "cnae",
      foreignField: "cnae",
      as: "dadosDivisaoCnae"
    }
  },
  {
    $unwind: "$dadosDivisaoCnae"
  },
  {
    $project: {
      UF: 1,
      ocupacao: 1,
      cnae: 1,
      salarioMedio: 1,
      empregados: 1,
      NM_OCUPACAO: 1,
      col_prob_auto: 1,
      divisao_cod_agg: "$dadosDivisaoCnae.divisao_cod_agg"
    }
  },

  {
    $group: {
      _id: { UF: "$UF", ocupacao: "$ocupacao", divisao_cod_agg: "$divisao_cod_agg" },
      UF: { $first: "$UF" },
      ocupacao: { $first: "$ocupacao" },
      divisao_cod_agg: { $first: "$divisao_cod_agg" },
      salarioMedio: { $avg: "$salarioMedio" },
      empregados: { $sum: "$empregados" },
      NM_OCUPACAO: { $first: "$NM_OCUPACAO"},
      col_prob_auto: { $first: "$col_prob_auto"}
    }
  },

  {
    $out: "AGREGADO_RAIS_PNAD"
  }
])
```