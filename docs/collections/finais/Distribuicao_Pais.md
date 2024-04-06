# Distribuicao_Pais

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [Distribuicao_Estado](./Distribuicao_Pais.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
    {
        $match: {
            "col_vinculo_ativo_31_12" : 1
        }
    },
    {
        $group: {
            _id: {
                estado: "$col_uf",
                ocupacao: "$col_cbo_2002",

            },
            estado: {$first: "$col_uf"},
            ocupacao: {$first: "$col_cbo_2002"},
            quantidade: { $sum: 1 } // Soma a quantidade de registros em cada grupo
        }
    },
    {
        $out: "Distribuicao_Pais"
    }
],    { allowDiskUse: true } )
```