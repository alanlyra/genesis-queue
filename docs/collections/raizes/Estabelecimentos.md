# Estabelecimentos

## Fontes 

[CNPJ](../../CNPJ.md) > [Estabelecimentos](./Estabelecimentos.md)

## Como gerar

1. Baixar do CNPJ os dados referentes aos estabelecimentos.
2. Os dados estão divididos em vários arquivos. Para formar a coleção, são necessários todos os arquivos disponíveis no CNPJ.
3. Depois que os dados de todos os arqivos disponíveis no CNPJ estiverem em uma única coleção, executar a seguinte agregação sobre a coleção [Estabelecimentos](./Estabelecimentos.md):

```
db.Estabelecimentos.aggregate([
  {
    $addFields: {
      CNAE_Fiscal_Principal_String: {
        $substr: [
          {
            $concat: [
              { $repeat: ["0", { $subtract: [7, { $strLenCP: { $toString: "$CNAE_Fiscal_Principal" } }] }] },
              { $toString: "$CNAE_Fiscal_Principal" }
            ]
          },
          0,
          2
        ]
      }
    }
  }
]);
```
4. Depois, sobre a mesma coleção, executar esta outra agregação:

```
db.Estabelecimentos.aggregate([
  {
    $addFields: {
      Termometro: {
        $switch: {
          branches: [
            {
              case: {
                $or: [
                  { $in: ["$CNAE_Fiscal_Principal_String", ["49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82"]]},
                  { $in: ["$CNAE_Fiscal_Principal_String", ["85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97"]]}
                ]
              },
              then: "Servicos"
            },
            {
              case: {
                $in: ["$CNAE_Fiscal_Principal_String", ["45", "46", "47"]]
              },
              then: "Comercio"
            }
          ],
          default: "NA"
        }
      }
    }
  }
]);
```