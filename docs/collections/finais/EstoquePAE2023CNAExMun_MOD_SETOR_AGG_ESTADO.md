# EstoquePAE2023CNAExMun_MOD_SETOR_AGG_ESTADO

## Fontes 

[SENAC](../../SENAC.md) > [EstoquePAE2023CNAExMun](../raizes/EstoquePAE2023CNAExMun.md) > [EstoquePAE2023CNAExMun_MOD](../intermediarias/EstoquePAE2023CNAExMun_MOD.md) > [EstoquePAE2023CNAExMun_MOD_SETOR_AGG](../intermediarias/EstoquePAE2023CNAExMun_MOD_SETOR_AGG.md) > [EstoquePAE2023CNAExMun_MOD_SETOR_AGG_ESTADO](./EstoquePAE2023CNAExMun_MOD_SETOR_AGG_ESTADO.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [EstoquePAE2023CNAExMun_MOD_SETOR_AGG](../intermediarias/EstoquePAE2023CNAExMun_MOD_SETOR_AGG.md):

```
db.EstoquePAE2023CNAExMun_MOD_SETOR_AGG.aggregate([
  {
    $lookup: {
      from: "MUNICIPIOS",
      localField: "codmun",
      foreignField: "col_cod",
      as: "municipio_info"
    }
  },
  {
    $unwind: "$municipio_info"
  },
  {
    $addFields: {
      estado: "$municipio_info.col_uf"
    }
  },
  {
    $unset: "municipio_info"
  },
  {
    $out: "EstoquePAE2023CNAExMun_MOD_SETOR_AGG_ESTADO"
  }
]);
```