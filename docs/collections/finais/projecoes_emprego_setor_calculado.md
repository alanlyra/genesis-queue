# projecoes_emprego_setor_calculado

## Fontes 

[SENAC](../../SENAC.md) > [[projecoes_emprego_setor](../raizes/projecoes_emprego_setor.md), [PNADc_ocupados_numerico](./PNADc_ocupados_numerico.md)] > [projecoes_emprego_setor_calculado](./projecoes_emprego_setor_calculado.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [projecoes_emprego_setor](../raizes/projecoes_emprego_setor.md):

```
db.projecoes_emprego_setor.aggregate([
    {
        $lookup: {
            from: "PNADc_ocupados_numerico",
            let: {
                uf_cd: "$uf_cd",
                divisao_cd: "$divisao_cd"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$uf_cd", "$$uf_cd"] },
                                { $eq: ["$divisao_cd", "$$divisao_cd"] }
                            ]
                        }
                    }
                }
            ],
            as: "ocupados_info"
        }
    },
    {
        $unwind: {
            path: "$ocupados_info",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project: {
            "_id": 1,
            "uf_cd": 1,
            "uf_nome": 1,
            "divisao": 1,
            "divisao_cd": 1,
            "variacao_22_30": 1,
            "variacao_sem_valor": 1,
            "ocupados": "$ocupados_info.ocupados",
            "ocupados_2030": {
                $multiply: [
                    "$ocupados_info.ocupados",
                    {
                        $add: [1, { $divide: ["$variacao_22_30", 100] }]
                    }
                ]
            }
        }
    },{
        $out: "projecoes_emprego_setor_calculado"
    }
])
```