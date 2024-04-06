# CAGEDFOR2023_MOD

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDFOR2023](../raizes/CAGEDFOR2023.md) > [CAGEDFOR2023_MOD](./CAGEDFOR2023_MOD.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDFOR2023](../raizes/CAGEDFOR2023.md):

```
db.CAGEDFOR2023.aggregate([
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
    $out: "CAGEDFOR2023_MOD"
  }
]);
```

2. Realizar a atualização da coleção [CAGEDFOR2023_MOD](./CAGEDFOR2023_MOD.md):

```
db.CAGEDFOR2023_MOD.updateMany(
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