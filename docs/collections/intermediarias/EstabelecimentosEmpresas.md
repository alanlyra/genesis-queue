# EstabelecimentosEmpresas

## Fontes 

[CNPJ](../../CNPJ.md) > [[Estabelecimentos](../raizes/Estabelecimentos.md),[Empresas](../raizes/Empresas.md)] > [EstabelecimentosEmpresas](./EstabelecimentosEmpresas.md)

## Como gerar

1. Executar a seguinte agregação sobre as coleções [Estabelecimentos](../raizes/Estabelecimentos.md) e [Empresas](../raizes/Empresas.md):

```
db.Estabelecimentos.aggregate([
    {
      $lookup: {
        from: "Empresas",
        localField: "CNPJ_Basico",
        foreignField: "CNPJ_Basico",
        as: "empresas_dados"
      }
    },
    {
      $addFields: {
        empresas_dados: { $arrayElemAt: ["$empresas_dados", 0] }
      }
    },
    {
      $addFields: {
        "Capital_Social_Empresa" : "$empresas_dados.Capital_Social_Empresa",
        "Natureza_Juridica" : "$empresas_dados.Natureza_Juridica",
        "Porte_Empresa" : "$empresas_dados.Porte_Empresa",
        "Razao_Social" : "$empresas_dados.Razao_Social",
        "Qualificacao_Responsavel" : "$empresas_dados.Qualificacao_Responsavel"
      }
    },
    {
      $project: {
        empresas_dados: 0
      }
    },
    {
        $out: "EstabelecimentosEmpresas"
    }
]);
```