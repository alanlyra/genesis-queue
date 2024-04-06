# Estabelecimentos_Mod

## Fontes 

[CNPJ](../../CNPJ.md) > [Estabelecimentos](../raizes/Estabelecimentos.md) > [Estabelecimentos_Mod](./Estabelecimentos_Mod.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [Estabelecimentos](../raizes/Estabelecimentos.md), cujo objetivo é calcular os anos que a empresa está (caso ativa até 1 de maio de 2023) ou esteve em atividade (caso inativa):

```
db.Estabelecimentos.aggregate([
   {
      $addFields: {
         Anos_Atividade: {
            $cond: {
               if: {
                  $in: ["$Situacao_Cadastral", [1, 2]]
               },
               then: {
                  $divide: [
                     {
                        $subtract: [
                           ISODate("2023-05-01"),
                           {
                              $dateFromParts: {
                                 year: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Inicio_Atividade", 0, 4]
                                       },
                                       1
                                    ]
                                 },
                                 month: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Inicio_Atividade", 4, 2]
                                       },
                                       1
                                    ]
                                 },
                                 day: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Inicio_Atividade", 6, 2]
                                       },
                                       1
                                    ]
                                 }
                              }
                           }
                        ]
                     },
                     1000 * 60 * 60 * 24 * 365 // Converter milissegundos para anos
                  ]
               },
               else: {
                  $divide: [
                     {
                        $subtract: [
                           {
                              $dateFromParts: {
                                 year: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Situacao_Cadastral", 0, 4]
                                       },
                                       1
                                    ]
                                 },
                                 month: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Situacao_Cadastral", 4, 2]
                                       },
                                       1
                                    ]
                                 },
                                 day: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Situacao_Cadastral", 6, 2]
                                       },
                                       1
                                    ]
                                 }
                              }
                           },
                           {
                              $dateFromParts: {
                                 year: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Inicio_Atividade", 0, 4]
                                       },
                                       1
                                    ]
                                 },
                                 month: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Inicio_Atividade", 4, 2]
                                       },
                                       1
                                    ]
                                 },
                                 day: {
                                    $divide: [
                                       {
                                          $substr: ["$Data_Inicio_Atividade", 6, 2]
                                       },
                                       1
                                    ]
                                 }
                              }
                           }
                        ]
                     },
                     1000 * 60 * 60 * 24 * 365 // Converter milissegundos para anos
                  ]
               }
            }
         }
      }
   },
   {
      $out: 'Estabelecimentos_Mod'
   }
])
```