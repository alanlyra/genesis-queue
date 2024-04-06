// Primeiro esse trecho:
db.getCollection("projecoes_emprego_setor_calculado").aggregate([
    {
      $lookup: {
        from: "PNADc_ocupados_numerico",
        let: { uf: "$uf_cd", divisao: "$divisao_cd" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$uf_cd", "$$uf"] },
                  { $eq: ["$divisao_cd", "$$divisao"] }
                ]
              }
            }
          }
        ],
        as: "dadosOcupados"
      }
    },
    {$out: "AgregadoPNADc"}
  ]);
// Depois esse trecho:
db.getCollection("AgregadoPNADc").aggregate([
    {
      $addFields: {
        "ocupados": {
          $cond: [
            { $ne: [{ $size: "$dadosOcupados" }, 0] },
            { $arrayElemAt: ["$dadosOcupados.ocupados", 0] },
            0.0
          ]
        },
        "salario_medio": {
          $cond: [
            { $ne: [{ $size: "$dadosOcupados" }, 0] },
            { $arrayElemAt: ["$dadosOcupados.salario_medio", 0] },
            0.0
          ]
        }
      }
    },
    {
      $unset: "dadosOcupados"
    },
    {$out: "AGREGADO_PNADC"}
  ])