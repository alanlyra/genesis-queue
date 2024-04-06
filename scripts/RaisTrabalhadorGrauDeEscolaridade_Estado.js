db.getCollection("RAIS_2021").aggregate([
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        col_escolaridade_2005: "$col_escolaridade_2005"
      },
      count: { $sum: 1 },
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      col_escolaridade_2005: "$_id.col_escolaridade_2005",
      ocupacao: "$_id.ocupacao",
      col_escolaridade_2005_name: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id.col_escolaridade_2005", 1] }, then: "Indígena" },
            { case: { $eq: ["$_id.col_escolaridade_2005", 2] }, then: "Branca" },
            { case: { $eq: ["$_id.col_escolaridade_2005", 4] }, then: "Preta" },
            { case: { $eq: ["$_id.col_escolaridade_2005", 6] }, then: "Amarela" },
            { case: { $eq: ["$_id.col_escolaridade_2005", 8] }, then: "Parda" },
            { case: { $eq: ["$_id.col_escolaridade_2005", 9] }, then: "Não identificado" },
            { case: { $eq: ["$_id.col_escolaridade_2005", -1] }, then: "Ignorado" }
          ],
          default: "$_id.col_escolaridade_2005"
        }
      },
      count: 1
    }
  },
  {
    $out: "RaisTrabalhadorGrauDeEscolaridade_Estado"
  }
],    { allowDiskUse: true } )

