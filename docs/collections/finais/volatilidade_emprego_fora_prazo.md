# volatilidade_emprego_fora_prazo

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDFOR2023](../raizes/CAGEDFOR2023.md) > [CAGEDFOR2023_MOD](../intermediarias/CAGEDFOR2023_MOD.md) > [CAGEDFOR2023_SETOR_AGG](../intermediarias/CAGEDFOR2023_SETOR_AGG.md) > [volatilidade_emprego_fora_prazo](./volatilidade_emprego_fora_prazo.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDFOR2023_SETOR_AGG](../raizes/CAGEDFORCAGEDFOR2023_SETOR_AGG.md):

```
db.getCollection("CAGEDFOR2023_SETOR_AGG").aggregate([
        { 
            $group : { 
                    _id : {
                        estado: "$uf",
                        setor: "$divisao_cod_agg"
                    },
                    estado: { $first: "$uf"},
					setor: { $first: "$divisao_cod_agg"},
                    admissoes : { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$eq": [ "$saldomovimentação", "-1" ] }, 
                                    "then": 0
                                }
                            ], 
                            "default": 1 
                            }
                        }
                    },
                    desligamentos : { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$eq": [ "$saldomovimentação", "-1" ] }, 
                                    "then": 1
                                }
                            ], 
                            "default": 0 
                            }
                        }
                    },
                    saldo : { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$eq": [ "$saldomovimentação", "-1" ] }, 
                                    "then": -1
                                }
                            ], 
                            "default": 1 
                            }
                        }
                    },
					admissoes_novas_vagas: { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$in": [ "$tipomovimentação", ["10","20"] ]}, 
                                    "then": 1
                                }
                            ], 
                            "default": 0
                            }
                        }
                    },
					demissoes_encerramento_vagas: { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$in": [ "$tipomovimentação", ["31","32","40","45","80","90"] ]}, 
                                    "then": 1
                                }
                            ], 
                            "default": 0
                            }
                        }
                    },
					demissoes_acordo: { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$eq": [ "$tipomovimentação", "90" ]}, 
                                    "then": 1
                                }
                            ], 
                            "default": 0
                            }
                        }
                    },
					demissoes_voluntarias: { 
                        $sum : {
                            $switch: {
                                "branches": [ 
                                { 
                                    "case": { "$eq": [ "$tipomovimentação", "40" ]}, 
                                    "then": 1
                                }
                            ], 
                            "default": 0
                            }
                        }
                    }
            }
        },
		{
			$out: "volatilidade_emprego_fora_prazo"
		}
        
    ], { allowDiskUse: true });
```