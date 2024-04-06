// db.getCollection("RAIS_2021").aggregate([
//     {
//       $match: {
//         "col_vinculo_ativo_31_12": 1
//       }
//     },
//     {
//       $addFields: {
//         cnae_subclasse_string: { $toString: "$col_cnae_subclasse" },
//         cnae_subclasse_adjusted: {
//           $cond: {
//             if: { $eq: [{ $strLenCP: { $toString: "$col_cnae_subclasse" } }, 7] },
//             then: { $substr: [{ $toString: "$col_cnae_subclasse" }, 0, 2] },
//             else: { $concat: ["0", { $substr: [{ $toString: "$col_cnae_subclasse" }, 0, 1] }] }
//           }
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           municipio: "$col_municipio",
//           cnae_subclasse: "$cnae_subclasse_adjusted",
//           faixaRemunMediaSM: "$faixaRemunMediaSM"
//         },
//         cnae_subclasse_string: { $first: "$cnae_subclasse_string" },
//         ocupacao: { $first: "$col_cbo_2002" },
//         estado: { $first: "$col_uf" },
//         faixaRemunMediaSM: { $first: "$faixaRemunMediaSM" },
//         remuneracao: { $sum: "$col_remun_media_trabalhador"},
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $out: "RaisSetorAgregacao"
//     }
//   ], { allowDiskUse: true });
  
  db.getCollection("RAIS_2021").aggregate([
    {
      $match: {
        "col_vinculo_ativo_31_12": 1
      }
    },
    {
      $addFields: {
        cnae_subclasse_string: { $toString: "$col_cnae_subclasse" },
        cnae_subclasse_adjusted: {
          $cond: {
            if: { $eq: [{ $strLenCP: { $toString: "$col_cnae_subclasse" } }, 7] },
            then: { $substr: [{ $toString: "$col_cnae_subclasse" }, 0, 2] },
            else: { $concat: ["0", { $substr: [{ $toString: "$col_cnae_subclasse" }, 0, 1] }] }
          }
        }
      }
    },
    {
      $group: {
        _id: {
          estado: "$col_uf",
          cnae_subclasse: "$cnae_subclasse_adjusted",
          faixaRemunMediaSM: "$faixaRemunMediaSM"
        },
        faixaRemunMediaSM: { $first: "$faixaRemunMediaSM" },
        remuneracao: { $sum: "$col_remun_media_trabalhador"},
        count: { $sum: 1 }
      }
    },
    {
      $out: "RaisSetorAgregacao"
    }
  ], { allowDiskUse: true });