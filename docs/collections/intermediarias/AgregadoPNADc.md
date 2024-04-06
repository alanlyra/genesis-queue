# AgregadoPNADc

## Fontes 

[SENAC](../../SENAC.md) > [[projecoes_emprego_setor_calculado](../finais/projecoes_emprego_setor_calculado.md), [PNADc_ocupados_numerico](../finais/PNADc_ocupados_numerico.md)] > [AgregadoPNADc](./AgregadoPNADc.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [projecoes_emprego_setor_calculado](../finais/projecoes_emprego_setor_calculado.md):

```
db.getCollection("projecoes_emprego_setor_calculado").aggregate([
    {
      $lookup: {
        from: "PNADc_ocupados_numerico",
        let: { uf: "$uf_cd", divisao: "$divisao_cd" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$uf_cd", "$$uf"] },
                  { $eq: ["$divisao_cd", "$$divisao"] }
                ]
              }
            }
          }
        ],
        as: "dadosOcupados"
      }
    },
    {$out: "AgregadoPNADc"}
  ]);
```