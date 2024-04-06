# resultado_cbo_div_uf_2023

## Fontes 

[SENAC](../../SENAC.md) > resultado_cbo_div_uf_2023

## Como gerar

1. A collection raíz foi disponibilizada pelo SENAC e pode ser encontrada [aqui](https://drive.google.com/drive/folders/1bMld8MZYqfQAjcZU2IQScK_xHYx0PCxa)
2. Subir a coleção para o banco
3. Executar a seguinte agregação sobre a coleção:

```
db.resultado_cbo_div_uf_2023.aggregate([
  {
    $addFields: {
      ocupados: {
        $cond: {
          if: { $eq: ["$ocupados", "NA"] },
          then: null,
          else: { $toDouble: { $replaceAll: { input: "$ocupados", find: ",", replacement: "." } } }
        }
      },
    }
  },
  {
      $out: "resultado_cbo_div_uf_2023"
  }
])
```