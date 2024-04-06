// Garantindo que o campo com os CNAES tenham 7 caracteres.

db.CAGEDEXC2023.aggregate([
    {
      $addFields: {
        subclasse_mod: {
          $substrCP: [
            {
              $concat: [
                { $substrCP: ["0000000", 0, { $subtract: [7, { $strLenCP: { $toString: "$subclasse" } }] }] },
                { $toString: "$subclasse" }
              ]
            },
            0,
            7
          ]
        }
      }
    },
    {
      $out: "CAGEDEXC2023_MOD"
    }
  ]);
  
  // Pegando os dois caracteres mais à esquerda dos códigos com 7 caracteres e colocando em um novo campo "setor".
  
  db.CAGEDEXC2023_MOD.updateMany(
    {},
    [
      {
        $addFields: {
          setor: { $substr: ["$subclasse_mod", 0, 2] }
        }
      }
    ]
  );
  
  // Colocando o campo "divisao_cod_agg" na CAGEDEXC2023_SETOR_AGG da CNAE_div_agg a partir do campo "setor" na CAGEDEXC2023_MOD para agregar por setores de acordo com a PNAD.
  
  db.CAGEDEXC2023_MOD.aggregate([
    {
      $lookup: {
        from: "CNAE_div_agg",
        localField: "setor",
        foreignField: "divisao_cod",
        as: "cnae_data"
      }
    },
    {
      $addFields: {
        cnae_data: { $arrayElemAt: ["$cnae_data", 0] }
      }
    },
    {
      $addFields: {
        divisao_cod_agg: "$cnae_data.divisao_cod_agg"
      }
    },
    {
      $project: {
        cnae_data: 0
      }
    },
    {
        $out: "CAGEDEXC2023_SETOR_AGG"
    }
  ]);
  
  // Agregando a nova coleção CAGEDEXC2023_SETOR_AGG para exibir os dados necessários.
  
  db.getCollection("CAGEDEXC2023_SETOR_AGG").aggregate([
          { 
              $group : { 
                      _id : {
                          estado: "$uf",
                          setor: "$divisao_cod_agg"
                      },
                      estado: { $first: "$uf"},
                      setor: { $first: "$divisao_cod_agg"},
                      admissoes : { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$eq": [ "$saldomovimentação", "-1" ] }, 
                                      "then": 0
                                  }
                              ], 
                              "default": 1 
                              }
                          }
                      },
                      desligamentos : { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$eq": [ "$saldomovimentação", "-1" ] }, 
                                      "then": 1
                                  }
                              ], 
                              "default": 0 
                              }
                          }
                      },
                      saldo : { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$eq": [ "$saldomovimentação", "-1" ] }, 
                                      "then": -1
                                  }
                              ], 
                              "default": 1 
                              }
                          }
                      },
                      admissoes_novas_vagas: { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$in": [ "$tipomovimentação", ["10","20"] ]}, 
                                      "then": 1
                                  }
                              ], 
                              "default": 0
                              }
                          }
                      },
                      demissoes_encerramento_vagas: { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$in": [ "$tipomovimentação", ["31","32","40","45","80","90"] ]}, 
                                      "then": 1
                                  }
                              ], 
                              "default": 0
                              }
                          }
                      },
                      demissoes_acordo: { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$eq": [ "$tipomovimentação", "90" ]}, 
                                      "then": 1
                                  }
                              ], 
                              "default": 0
                              }
                          }
                      },
                      demissoes_voluntarias: { 
                          $sum : {
                              $switch: {
                                  "branches": [ 
                                  { 
                                      "case": { "$eq": [ "$tipomovimentação", "40" ]}, 
                                      "then": 1
                                  }
                              ], 
                              "default": 0
                              }
                          }
                      }
              }
          },
          {
              $out: "volatilidade_emprego"
          }
          
      ], { allowDiskUse: true })