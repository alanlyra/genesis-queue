db.getCollection("RAIS_2021").aggregate([

  {
    $match: {
      "col_vinculo_ativo_31_12": 1,
      "col_remun_media_trabalhador": {
          $gt: 300,
          $lt: 30000
      }
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        col_raca_cor: "$col_raca_cor"
      },
      count: { $sum: 1 },
      min_remun_media_trabalhador: { $min: "$col_remun_media_trabalhador" },
      max_remun_media_trabalhador: { $max: "$col_remun_media_trabalhador" },
      remun_trabalhador: { $push: "$col_remun_media_trabalhador" },
      media_remun_trabalhador: { $avg: "$col_remun_media_trabalhador" }
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
      count: 1,
      remun_trabalhador: 1,
      media_remun_trabalhador: 1,
      min_remun_media_trabalhador: 1,
      max_remun_media_trabalhador: 1
    }
  },
  {
    $project: {
      estado: 1,
      col_raca_cor: 1,
      ocupacao: 1,
      raca_cor_name: 1,
      count: 1,
      remun_trabalhador: 1,
      media_remun_trabalhador: 1,
      min_remun_media_trabalhador: 1,
      max_remun_media_trabalhador: 1
    }
  },
  {
    $out: "RacaSalarioTrabalhador_Estado"
  }
],    { allowDiskUse: true } )

