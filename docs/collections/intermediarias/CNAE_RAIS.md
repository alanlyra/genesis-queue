# CNAE_RAIS

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [CNAE_RAIS](./CNAE_RAIS.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021](../finais/RAIS_2021.md):

```
db.getCollection("RAIS_2021").aggregate([
  {
    $addFields: {
      cnae: {
        $trunc: {
          $divide: ["$col_cnae_subclasse", 100000]
        }
      }
    }
  },
  {$out:"CNAE_RAIS"}
])
```