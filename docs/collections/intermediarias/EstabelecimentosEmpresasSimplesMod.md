# EstabelecimentosEmpresasSimplesMod

## Fontes 

[CNPJ](../../CNPJ.md) > [[Estabelecimentos](../raizes/Estabelecimentos.md),[Empresas](../raizes/Empresas.md)] > [[EstabelecimentosEmpresas](./EstabelecimentosEmpresas.md), [SimplesEmpresas](../raizes/SimplesEmpresas.md)] > [EstabelecimentosEmpresasSimples](./EstabelecimentosEmpresasSimples.md) > [EstabelecimentosEmpresasSimplesMod](./EstabelecimentosEmpresasSimplesMod.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [EstabelecimentosEmpresasSimples](./EstabelecimentosEmpresasSimples.md):

```
db.EstabelecimentosEmpresasSimples.aggregate([
  {
    $addFields: {
      Capital_Social_Empresa_Mod: {
        $toDouble: "$Capital_Social_Empresa"
      }
    }
  },
  {
      $out: "EstabelecimentosEmpresasSimplesMod"
  }
]);
```