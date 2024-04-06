# volatilidade_emprego_excluidos

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDEXC2023](../raizes/CAGEDEXC2023.md) > [CAGEDEXC2023_MOD](../intermediarias/CAGEDEXC2023_MOD.md) > [CAGEDEXC2023_SETOR_AGG](../intermediarias/CAGEDEXC2023_SETOR_AGG.md) > [volatilidade_emprego_excluidos](./volatilidade_emprego_excluidos.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDEXC2023_SETOR_AGG](../raizes/CAGEDEXCCAGEDEXC2023_SETOR_AGG.md):

```
db.getCollection("CAGEDEXC2023_SETOR_AGG").aggregate([
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
			$out: "volatilidade_emprego_excluidos"
		}
        
    ], { allowDiskUse: true });
```