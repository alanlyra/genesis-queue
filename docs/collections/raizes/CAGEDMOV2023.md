# CAGEDMOV2023

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDMOV2023](./CAGEDMOV2023.md)

## Como gerar

1. Baixar dados do Cadastro Geral de Empregados e Desempregados (CAGED) e colocá-los em uma coleção, uma coleção por ano. Estes são os dados de registros de movimentações (MOV), mas há também os dados de registros incluídos fora do prazo (FOR) e correções por conta de exclusões de registros (EXC). 

2. Assegurar o tipo dos campos a seguir:
    competênciadec = int
	sublasse = string
	cbo2002ocupação = string
	uf = int
	saldomovimentação = int