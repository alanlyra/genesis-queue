# RacaTrabalhador_Estado

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [RacaTrabalhador_Estado](./RacaTrabalhador_Estado.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../raizes/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
  {
      $match: {
          "col_vinculo_ativo_31_12" : 1
      }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        col_raca_cor: "$col_raca_cor"
      },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      col_raca_cor: "$_id.col_raca_cor",
      ocupacao: "$_id.ocupacao",
      raca_cor_name: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id.col_raca_cor", 1] }, then: "Indígena" },
            { case: { $eq: ["$_id.col_raca_cor", 2] }, then: "Branca" },
            { case: { $eq: ["$_id.col_raca_cor", 4] }, then: "Preta" },
            { case: { $eq: ["$_id.col_raca_cor", 6] }, then: "Amarela" },
            { case: { $eq: ["$_id.col_raca_cor", 8] }, then: "Parda" },
            { case: { $eq: ["$_id.col_raca_cor", 9] }, then: "Não identificado" },
            { case: { $eq: ["$_id.col_raca_cor", -1] }, then: "Ignorado" }
          ],
          default: "$_id.col_raca_cor"
        }
      },
      count: 1
    }
  },
  {
    $out: "RacaTrabalhador_Estado" // Cria uma nova coleção chamada "faixaEtaria"
  }
])
```