# big_number_salario_medio_senac_estado

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [big_number_salario_medio_senac_estado](./big_number_salario_medio_senac_estado.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
	{
		$match : {col_vinculo_ativo_31_12: 1, col_remun_media_trabalhador: { $gte: 300, $lte: 30000} }
	},
    { 
        $group : { 
             _id : {
                 UF: "$col_uf",
                 ocupacao: "$col_cbo_2002",
                 escolaridade: "$col_escolaridade_2005"
              },
              "col_uf": { $first: "$col_uf"},
              "col_cbo_2002": { $first: "$col_cbo_2002"},
              "col_escolaridade_2005": { $first: "$col_escolaridade_2005"},
              "quantidade": {
                  $sum: 1
              },
              "media" : { 
                  $avg : "$col_remun_media_trabalhador"
              }
        }
    },
    {
        $addFields: {
            "ano": "2021"
        }
    },
    {
        $sort: {
            "col_uf": 1,
            "col_cbo_2002": 1,
            "col_escolaridade_2005": 1,
            "media": -1,
        }
    },
    {
		$out: "big_number_salario_medio_senac_estado"
	}
], { allowDiskUse: true });
```