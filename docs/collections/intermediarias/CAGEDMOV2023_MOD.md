# CAGEDMOV2023_MOD

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDMOV2023](../raizes/CAGEDMOV2023.md) > [CAGEDMOV2023_MOD](./CAGEDMOV2023_MOD.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDMOV2023](../raizes/CAGEDMOV2023.md):

```
db.CAGEDMOV2023.aggregate([
  {
    $addFields: {
      subclasse_mod: {
        $substrCP: [
          {
            $concat: [
              { $substrCP: ["0000000", 0, { $subtract: [7, { $strLenCP: { $toString: "$subclasse" } }] }] },
              { $toString: "$subclasse" }
            ]
          },
          0,
          7
        ]
      }
    }
  },
  {
    $out: "CAGEDMOV2023_MOD"
  }
]);
```

2. Realizar a atualização da coleção [CAGEDMOV2023_MOD](./CAGEDMOV2023_MOD.md):

```
db.CAGEDMOV2023_MOD.updateMany(
  {},
  [
    {
      $addFields: {
        setor: { $substr: ["$subclasse_mod", 0, 2] }
      }
    }
  ]
);
```