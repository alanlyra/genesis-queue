db.Estabelecimentos.aggregate([
   {
      $addFields: {
         "AnoMes_Inicio_Atividade": {
            $toInt: {
               $substr: [{ $toString: "$Data_Inicio_Atividade" }, 0, 6]
            }
         },
         "AnoMes_Situacao_Cadastral": {
            $toInt: {
               $substr: [{ $toString: "$Data_Situacao_Cadastral" }, 0, 6]
            }
         }
      }
   },
   {
      $group: {
         _id: {
            Termometro: "$Termometro",
            UF: "$UF"
         },
         Termometro: {$first: "$Termometro"},
         UF: {$first: "$UF"},
         qtd_inicio_atividade_12_meses: {
            $sum: {
               $cond: [
                  { $gte: ["$AnoMes_Inicio_Atividade", 202204] },
                  1,
                  0
               ]
            }
         },
         qtd_situacao_cadastral: {
            $sum: {
               $cond: [
                  {
                     $and: [
                        { $gte: ["$AnoMes_Situacao_Cadastral", 202204] },
                        { $in: ["$Situacao_Cadastral", [3, 4, 8]] }
                     ]
                  },
                  1,
                  0
               ]
            }
         }
      }
   },{
      $addFields: {
         saldo_empresas: { $subtract: ["$qtd_inicio_atividade_12_meses", "$qtd_situacao_cadastral"] }
      }
   },
   {
       $out: "Saldo_Estabelecimentos"
   }
])