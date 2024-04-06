# CAGED_COMERCIO_AUX

## Fontes 

[CAGED](../../CAGED.md) > [[CAGEDMOV2023](../raizes/CAGEDMOV2023.md), [CAGEDEXC2023](../raizes/CAGEDEXC2023.md), [CAGEDFOR2023](../raizes/CAGEDFOR2023.md)] > [CAGED_COMERCIO_AUX](../intermediarias/CAGED_COMERCIO_AUX.md)

## Como gerar

1. Tendo as bases CAGEDMOV, CAGEDEXC e CAGEDFOR provenientes do governo atualizadas do ano mais recente disponível e do ano anterior caso o mês do ano mais recente não seja dezembro.(intervalos de 12 meses)

2. Apagar os dados presentes na base CAGED_COMERCIO_AUX.

3. Agregar em coleção intermediária cada coleção CAGEDMOV, CAGEDEXC e CAGEDFOR os documentos dos últimos 12 meses disponíveis ('competênciaexc' para CAGEDEXC e 'competênciadec' para as outras coleções). Selecionando ocupações que estejam na área de comércio e apenas campos utilizados para a agregação das coleções finais. Exemplo de script abaixo:

```
const comercio = ["45", "46", "47", "48"];

const collectionsToProcess = ["CAGEDEXC2022"];
// Caso precise definir meses a serem analisados utilizar meses e o primeiro match do pipeline:
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
          cnae: { $in: comercio },
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
          into: "CAGED_COMERCIO_AUX",
          whenMatched: "keepExisting",
          whenNotMatched: "insert",
        },
      }
  ]);
});
```