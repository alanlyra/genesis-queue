db.getCollection("RAIS_2021").aggregate([
  {
      $match: {
          "col_vinculo_ativo_31_12" : 1
      }
  },
  {
    $match: {
      faixaEtaria: { $ne: "01" } // Exclui a faixa etária com valor 1
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        faixaEtaria: "$faixaEtaria"
      },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      faixaEtaria: "$_id.faixaEtaria",
      ocupacao: "$_id.ocupacao",
      faixaEtariaName: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id.faixaEtaria", 1] }, then: "10 A 14 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 2] }, then: "15 A 17 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 3] }, then: "18 A 24 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 4] }, then: "25 A 29 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 5] }, then: "30 A 39 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 6] }, then: "40 A 49 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 7] }, then: "50 A 64 anos" },
            { case: { $eq: ["$_id.faixaEtaria", 8] }, then: "65 anos ou mais" }
          ],
          default: "$_id.faixaEtaria"
        }
      },
      count: 1
    }
  },
  {
    $out: "FaixaEtaria_Estado" // Cria uma nova coleção chamada "faixaEtaria"
  }
])