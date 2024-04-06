# pnad_ocupados_completo_mod

## Fontes 

[SENAC](../../SENAC.md) > [PNADc_ocupados_totais](../raizes/PNADc_Ocupados.md) > [pnad_ocupados_completo_mod](./pnad_ocupados_completo_mod.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [PNADc_ocupados_totais](../raizes/PNADc_Ocupados.md):

```
db.getCollection("PNADC_ocupados_totais").aggregate([
  {
    $addFields: {
      divisao_cd_mod: {
        $cond: {
          if: { $lt: [{ $strLenCP: { $toString: "$divisao_cd" } }, 2] },
          then: { $concat: ["0", { $toString: "$divisao_cd" }] },
          else: { $toString: "$divisao_cd" }
        }
      }
    }
  },
  {
    $out: "pnad_ocupados_completo_mod"
  }
]);
```