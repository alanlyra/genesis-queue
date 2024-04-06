# media_salarial_estado_setor

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [RAIS_2021_SETOR](../intermediarias/RAIS_2021_SETOR.md) > [RAIS_2021_SETOR_MOD](../intermediarias/RAIS_2021_SETOR_MOD.md) > [RAIS_2021_SETOR_MOD_AGG](../intermediarias/RAIS_2021_SETOR_MOD_AGG.md) > [media_salarial_estado_setor](./media_salarial_estado_setor.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021_SETOR_MOD_AGG](../intermediarias/RAIS_2021_SETOR_MOD_AGG.md):

```
db.getCollection("RAIS_2021_SETOR_MOD_AGG").aggregate([
	{
		$match : {
			col_vinculo_ativo_31_12: 1,
			col_remun_media_trabalhador: {
				$gte: 300.00,
				$lte: 30000.00
			}
		}
	},
    { 
        $group : { 
             _id : {
                 estado: "$col_uf",
                 setor: "$divisao_cod_agg"
              },
              estado: { $first: "$col_uf"},
              setor: { $first: "$divisao_cod_agg"},
              quantidade: {
                  $sum: 1
              },
              media_salarial_setor : { 
                  $avg : "$col_remun_media_trabalhador"
              }
        }
    },
	{
		$project: {
			_id: 0,
			estado: 1,
			setor: 1,
			quantidade: 1,
			media_salarial_setor: 1
		}
	},
    {
		$out: "media_salarial_estado_setor"
	}
], { allowDiskUse: true });
```