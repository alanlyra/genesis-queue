db.EstabelecimentosFinal.updateMany(
  {Nome_Fantasia: null},
  [
    {
      $set: {
        Nome_Fantasia_Real: "$Nome_Fantasia"
      }
    },
    {
      $set: {
        Nome_Fantasia: {
          $cond: {
            if: { $ne: ["$Nome_Fantasia", null] },
            then: { $trim: { input: "$Nome_Fantasia" } },
            else: { $trim: { input: "$Razao_Social" } }
          }
        }
      }
    }
  ]
)