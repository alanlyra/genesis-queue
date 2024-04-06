# CAGED_SERVICO_AUX

## Fontes 

[CAGED](../../CAGED.md) > [[CAGEDMOV2023](../raizes/CAGEDMOV2023.md), [CAGEDEXC2023](../raizes/CAGEDEXC2023.md), [CAGEDFOR2023](../raizes/CAGEDFOR2023.md)] > [CAGED_SERVICO_AUX](../intermediarias/CAGED_SERVICO_AUX.md)

## Como gerar

1. Tendo as bases CAGEDMOV, CAGEDEXC e CAGEDFOR provenientes do governo atualizadas do ano mais recente disponível e do ano anterior caso o mês do ano mais recente não seja dezembro.(intervalos de 12 meses)

2. Apagar os dados presentes na base CAGED_SERVICO_AUX.

3. Agregar em coleção intermediária cada coleção CAGEDMOV, CAGEDEXC e CAGEDFOR os documentos dos últimos 12 meses disponíveis ('competênciaexc' para CAGEDEXC e 'competênciadec' para as outras coleções). Selecionando ocupações que estejam na área de serviço e apenas campos utilizados para a agregação das coleções finais. Exemplo de script abaixo para uma das coleções de CAGEDEXC do ano anterior:

```
const servico = ['49', '50', '51', '52', '53', '55',
  '56', '58', '59', '60', '61', '62',
  '63', '64', '65', '66', '68', '69',
  '70', '71', '72', '73', '74', '75',
  '77', '78', '79', '80', '81', '82',
  '85', '86', '87', '88', '90', '91',
  '92', '93', '94', '95', '96', '97'];

const collectionsToProcess = ["CAGEDEXC2022"];

// Caso precise definir meses a serem analisados, utilizar meses e o primeiro match do pipeline para o ano anterior:
const meses = [202211,202212]

collectionsToProcess.forEach(collection => {
  db.getCollection(collection).aggregate([
      {
        $match: {
          "competênciaexc": { $in: meses },
        },
      },
      {
        $addFields: {
          cnae: {
            $cond: {
              if: { $eq: [{ $strLenCP: "$subclasse" }, 7] },
              then: { $substr: ["$subclasse", 0, 2] },
              else: { $concat: ["0", { $substr: ["$subclasse", 0, 1] }] },
            },
          },
        },
      },
      {
        $match: {
          cnae: { $in: servico },
        },
      },
      {
        $project: {
          _id: 0,
          uf: 1,
          "cbo2002ocupação": 1,
          "saldomovimentação": 1
        },
      },
      {
        $merge: {
          into: "CAGED_SERVICO_AUX",
          whenMatched: "keepExisting",
          whenNotMatched: "insert",
        },
      }
  ]);
});
```

3. Rodar script abaixo para agrupar as informações das coleções intermediárias anteriores nas coleções finais que tenham o modelo de coleção identico a caged_agregado_servicos.

```
db.getCollection("CAGED_SERVICO_AUX").aggregate([
    {
      $group: {
        _id: {UF: "$uf", ocupacao: "$cbo2002ocupação"},
        UF: {$first: "$uf"},
        ocupacao: {$first: "$cbo2002ocupação"},
        total: { $sum: "$saldomovimentação" }
      }
    },
    {$out:"caged_agregado_servicos"}
  ])
```