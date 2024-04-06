# RAIS_2021_SETOR

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [RAIS_2021_SETOR](./RAIS_2021_SETOR.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.RAIS_2021.aggregate([
    {
    $addFields: {
        setor: {
        $substr: [
            {
            $concat: [
                { $substrCP: ["0000000", 0, { $subtract: [7, { $strLenCP: { $toString: "$col_cnae_subclasse" } }] }] },
                { $toString: "$col_cnae_subclasse" }
            ]
            },
            0,
            2
        ]
        }
    }
    },
    {
        $out: 'RAIS_2021_SETOR'
    }
]);
```