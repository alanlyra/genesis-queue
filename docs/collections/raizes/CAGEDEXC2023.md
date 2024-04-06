# CAGEDEXC2023

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDEXC2023](./CAGEDEXC2023.md)

## Como gerar

1. Baixar dados do Cadastro Geral de Empregados e Desempregados (CAGED) e colocá-los em uma coleção, uma coleção por ano. Estes são os dados de registros que foram excluídos (EXC), mas há também os dados de registros de movimentações incluídos dentro (MOV) e fora do prazo (FOR). 

2. Assegurar o tipo dos campos a seguir:
    competênciaexc = int
	sublasse = string
	cbo2002ocupação = string
	uf = int
	saldomovimentação = int