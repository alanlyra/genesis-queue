db.getCollection("RAIS_2021").aggregate([
    { $match: { col_vinculo_ativo_31_12: 1} },
    { $project: {
      col_cbo_2002: 1,
      clt1 : { $cond: [{$and: [{$gte: ['$col_tipo_vinculo', 10]},{$lte: ['$col_tipo_vinculo', 25]}]}, 1, 0] },
      clt2 : { $cond: [{$and: [{$gte: ['$col_tipo_vinculo', 60]},{$lte: ['$col_tipo_vinculo', 75]}]}, 1, 0] },
      estat1 : { $cond: [{$and: [{$gte: ['$col_tipo_vinculo', 30]},{$lte: ['$col_tipo_vinculo', 35]}]}, 1, 0] }
    }},
    { $group: {
        _id: '$col_cbo_2002',
        total: { $sum: 1 },
        clt: { $sum: {$add : ['$clt1', '$clt2']}},
        estat: { $sum: '$estat1'},
      }
    },
    {
      $addFields: {
        outros: { $subtract : ["$total",{$add: [ "$clt", "$estat"]}] }
      }
    },
    {$out: "Vinculo_Ocupacao_Pais"}
  ]);