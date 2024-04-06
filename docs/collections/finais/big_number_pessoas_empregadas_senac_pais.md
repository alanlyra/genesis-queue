# big_number_pessoas_empregadas_senac_pais

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [big_number_pessoas_empregadas_senac_pais](./big_number_pessoas_empregadas_senac_pais.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
	{
		$match : {col_vinculo_ativo_31_12: 1 }
	},
    { 
        $group : { 
             _id : {
                 ano: "2021",
                 ocupacao: "$col_cbo_2002",
                 escolaridade: "$col_escolaridade_2005"
              },
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
            "col_cbo_2002": 1,
            "col_escolaridade_2005": 1,
            "media": -1,
        }
    },
	{
		$out: "big_number_pessoas_empregadas_senac_pais"
	}
    
], { allowDiskUse: true });
```