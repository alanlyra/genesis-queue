# EstabelecimentoAgregacao

## Fontes 

[CNPJ](../../CNPJ.md) > [Estabelecimentos](../raizes/Estabelecimentos.md) > [EstabelecimentoAgregacao](./EstabelecimentoAgregacao.md)

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
        municipio: "$Municipio",
        estado: "$UF",
        setor: "$CNAE_Fiscal_Principal_String"
      },
      total: { $sum: 1 }
    }
  },
  {
    $out: "EstabelecimentoAgregacao"
  }
]);
```