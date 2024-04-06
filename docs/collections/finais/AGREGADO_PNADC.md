# AGREGADO_PNADC

## Fontes 

[SENAC](../../SENAC.md) > [[projecoes_emprego_setor_calculado](./projecoes_emprego_setor_calculado.md), [PNADc_ocupados_numerico](./PNADc_ocupados_numerico.md)] > [AgregadoPNADc](../intermediarias/AgregadoPNADc.md) > [AGREGADO_PNADC](./AGREGADO_PNADC.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [AgregadoPNADc](../intermediarias/AgregadoPNADc.md):

```
db.getCollection("AgregadoPNADc").aggregate([
    {
      $addFields: {
        "ocupados": {
          $cond: [
            { $ne: [{ $size: "$dadosOcupados" }, 0] },
            { $arrayElemAt: ["$dadosOcupados.ocupados", 0] },
            0.0
          ]
        },
        "ocupados_cv": {
          $cond: [
            { $ne: [{ $size: "$dadosOcupados" }, 0] },
            { $arrayElemAt: ["$dadosOcupados.ocupados_cv", 0] },
            0.0
          ]
        },
        "salario_medio": {
          $cond: [
            { $ne: [{ $size: "$dadosOcupados" }, 0] },
            { $arrayElemAt: ["$dadosOcupados.salario_medio", 0] },
            0.0
          ]
        }
      }
    },
    {
      $unset: "dadosOcupados"
    },
    {$out: "AGREGADO_PNADC"}
  ])
```