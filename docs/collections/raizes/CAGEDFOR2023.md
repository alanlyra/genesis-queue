# CAGEDFOR2023

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDFOR2023](./CAGEDFOR2023.md)

## Como gerar

1. Baixar dados do Cadastro Geral de Empregados e Desempregados (CAGED) e colocá-los em uma coleção, uma coleção por ano. Estes são os dados de registros que foram incluídos fora do prazo (FOR), mas há também os dados de registros de movimentações incluídos dentro do prazo (MOV) e correções por conta de exclusões de registros (EXC). 

2. Assegurar o tipo dos campos a seguir:
    competênciadec = int
	sublasse = string
	cbo2002ocupação = string
	uf = int
	saldomovimentação = int