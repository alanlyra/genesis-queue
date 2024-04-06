db.getCollection("RAIS_2021").aggregate([
  {
    $match: {
      "col_vinculo_ativo_31_12": 1
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002"
      },
      count: { $sum: 1 },
      remuneracao: {$push: "$col_remun_media_trabalhador"}
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      remuneracao: 1,
      ocupacao: "$_id.ocupacao",
      count: 1,
    }
  },
  {
    $out: "RaisTrabalhadorSalarial"
  }
], { allowDiskUse: true });
/*
---Script anterior
db.getCollection("RAIS_2021").aggregate([
  {
    $match: {
      "col_vinculo_ativo_31_12": 1
    }
  },
  {
    $group: {
      _id: {
        estado: "$col_uf",
        ocupacao: "$col_cbo_2002",
        faixaRemunMediaSM: "$faixaRemunMediaSM"
      },
      count: { $sum: 1 },
      faixaRemunMediaSM: { $first: "$faixaRemunMediaSM" }
    }
  },
  {
    $project: {
      _id: 0,
      estado: "$_id.estado",
      faixaRemunMediaSM: 1,
      ocupacao: "$_id.ocupacao",
      count: 1,
    }
  },
  {
    $out: "RaisTrabalhadorSalarialConsolidade"
  }
], { allowDiskUse: true });
*/