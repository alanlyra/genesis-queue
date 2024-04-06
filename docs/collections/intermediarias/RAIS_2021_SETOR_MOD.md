# RAIS_2021_SETOR_MOD

## Fontes 

[RAIS](../../RAIS.md) > [RAIS_2021](../raizes/RAIS_2021.md) > [RAIS_2021_SETOR](./RAIS_2021_SETOR.md) > [RAIS_2021_SETOR_MOD](./RAIS_2021_SETOR_MOD.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [RAIS_2021_SETOR](./RAIS_2021_SETOR.md):

```
db.RAIS_2021_SETOR.aggregate([
    {
        $set: {
            setor: { $substr: ["$setor", 0, 2] }
        }
    },
    {
        $out: 'RAIS_2021_SETOR_MOD'
    }
]);
```