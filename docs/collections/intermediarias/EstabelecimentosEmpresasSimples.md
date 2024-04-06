# EstabelecimentosEmpresasSimples

## Fontes 

[CNPJ](../../CNPJ.md) > [[Estabelecimentos](../raizes/Estabelecimentos.md), [Empresas](../raizes/Empresas.md)] > [[EstabelecimentosEmpresas](./EstabelecimentosEmpresas.md), [SimplesEmpresas](../raizes/SimplesEmpresas.md)] > [EstabelecimentosEmpresasSimples](./EstabelecimentosEmpresasSimples.md)

## Como gerar

1. Executar a seguinte agregação sobre as coleções [EstabelecimentosEmpresas](./EstabelecimentosEmpresas.md) e  [SimplesEmpresas](../raizes/SimplesEmpresas.md):

```
db.EstabelecimentosEmpresas.aggregate([
    {
      $lookup: {
        from: "SimplesEmpresas",
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
          "Data_Exclusao_MEI" : "$empresas_dados.Data_Exclusao_MEI",
          "Data_Exclusao_Simples" : "$empresas_dados.Data_Exclusao_Simples",
          "Data_Opcao_MEI" : "$empresas_dados.Data_Opcao_MEI",
          "Data_Opcao_Simples" : "$empresas_dados.Data_Opcao_Simples",
          "Opcao_MEI" : "$empresas_dados.Opcao_MEI",
          "Opcao_Simples" : "$empresas_dados.Opcao_Simples"
      }
    },
    {
      $project: {
        empresas_dados: 0
      }
    },
    {
        $out: "EstabelecimentosEmpresasSimples"
    }
]);
```