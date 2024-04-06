# CAGEDEXC2023_MOD

## Fontes 

[CAGED](../../CAGED.md) > [CAGEDEXC2023](../raizes/CAGEDEXC2023.md) > [CAGEDEXC2023_MOD](./CAGEDEXC2023_MOD.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [CAGEDEXC2023](../raizes/CAGEDEXC2023.md):

```
db.CAGEDEXC2023.aggregate([
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
    $out: "CAGEDEXC2023_MOD"
  }
]);
```

2. Realizar a atualização da coleção [CAGEDEXC2023_MOD](./CAGEDEXC2023_MOD.md):

```
db.CAGEDEXC2023_MOD.updateMany(
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