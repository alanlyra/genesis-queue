# caged_agregado_comercio

## Fontes 

[CAGED](../../CAGED.md) > [[CAGEDMOV2023](../raizes/CAGEDMOV2023.md), [CAGEDEXC2023](../raizes/CAGEDEXC2023.md), [CAGEDFOR2023](../raizes/CAGEDFOR2023.md)] > [CAGED_COMERCIO_AUX](../intermediarias/CAGED_COMERCIO_AUX.md) > [caged_agregado_comercio](./caged_agregado_comercio.md)

## Como gerar

1. Rodar script abaixo para agrupar as informações da coleção CAGED_COMERCIO_AUX.

```
db.getCollection("CAGED_COMERCIO_AUX").aggregate([
    {
      $group: {
        _id: {UF: "$uf", ocupacao: "$cbo2002ocupação"},
        UF: {$first: "$uf"},
        ocupacao: {$first: "$cbo2002ocupação"},
        total: { $sum: "$saldomovimentação" }
      }
    },
    {$out:"caged_agregado_comercio"}
  ])
```