# Empresas_Ativas

## Fontes 

[CNPJ](../../CNPJ.md) > [Estabelecimentos](../raizes/Estabelecimentos.md) > [Empresas_Ativas](./Empresas_Ativas.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [Estabelecimentos](../raizes/Estabelecimentos.md):

```
db.getCollection("Estabelecimentos").aggregate([
{
    $match: {
        Situacao_Cadastral: 2
    }  
},
{
    $group: {
        _id: {
            UF: "$UF",
            CNAE_Fiscal_Principal_String: "$CNAE_Fiscal_Principal_String"
        },
        UF: {$first: "$UF"},
        CNAE_Fiscal_Principal_String: {$first: "$CNAE_Fiscal_Principal_String"},
        qtd_situacao_cadastral_ativa: {
            $sum: 1
        }
    }
},{
    $out: "Empresas_Ativas"
}
])
```