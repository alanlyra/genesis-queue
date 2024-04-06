# EstoquePAE2023CNAExMun_MOD

## Fontes 

[SENAC](../../SENAC.md) > [EstoquePAE2023CNAExMun](../raizes/EstoquePAE2023CNAExMun.md) > [EstoquePAE2023CNAExMun_MOD](./EstoquePAE2023CNAExMun_MOD.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [EstoquePAE2023CNAExMun](../raizes/EstoquePAE2023CNAExMun.md):

```
db.EstoquePAE2023CNAExMun.aggregate([
  {
    $addFields: {
      cnae20subclas_mod: {
        $substrCP: [
          {
            $concat: [
              { $substrCP: ["0000000", 0, { $subtract: [7, { $strLenCP: { $toString: "$cnae20subclas" } }] }] },
              { $toString: "$cnae20subclas" }
            ]
          },
          0,
          7
        ]
      }
    }
  },
  {
    $out: "EstoquePAE2023CNAExMun_MOD"
  }
]);
```

2. Atualizar a coleção [EstoquePAE2023CNAExMun_MOD](./EstoquePAE2023CNAExMun_MOD.md):

```
db.EstoquePAE2023CNAExMun_MOD.updateMany(
  {},
  [
    {
      $addFields: {
        setor: { $substr: ["$cnae20subclas_mod", 0, 2] }
      }
    }
  ]
);
```