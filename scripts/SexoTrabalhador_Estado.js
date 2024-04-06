db.getCollection("RAIS_2021").aggregate([
  {
      $match: {
          "col_vinculo_ativo_31_12" : 1
      }
  },
  {
    $match: {
      col_sexo_trabalhador: { $ne: -1 } // Exclui a faixa etária com valor 1
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        col_sexo_trabalhador: "$col_sexo_trabalhador"
      },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      col_sexo_trabalhador: "$_id.col_sexo_trabalhador",
      ocupacao: "$_id.ocupacao",
      sexo_trabalhador_name: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id.col_sexo_trabalhador", 1] }, then: "Masculino" },
            { case: { $eq: ["$_id.col_sexo_trabalhador", 2] }, then: "Feminino" }
          ],
          default: "$_id.col_sexo_trabalhador"
        }
      },
      count: 1
    }
  },
  {
    $out: "SexoTrabalhador_Estado" // Cria uma nova coleção chamada "faixaEtaria"
  }
])