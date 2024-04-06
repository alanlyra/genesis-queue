# ConcorrenciaEscolaEstado

## Fontes 

[SisTec](../../SISTEC.md) > [[Sistec_Unidades_Ensino2022](../raizes/Sistec_Unidades_Ensino2022.md),[Sistec_Cursos_Tecnicos_ativos2022](../raizes/Sistec_Cursos_Tecnicos_ativos2022.md)] > [sistec_cursos_unidades_senac](./sistec_cursos_unidades_senac.md) > [ConcorrenciaEscolaEstado](./ConcorrenciaEscolaEstado.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção ["sistec_cursos_unidades_senac"](./sistec_cursos_unidades_senac.md):

```
db.getCollection("sistec_cursos_unidades_senac").aggregate([
  {
    $match: {
      $or: [
        {
          NO_TIPO_ESCOLA: 'ESCOLAS TÉCNICAS',
          NO_SUBDEPENDENCIA_ADMIN: { $ne: 'SENAC' },
          MODALIDADE: 'EDUCAÇÃO PRESENCIAL'
        },
        {
          NO_TIPO_ESCOLA: 'ESCOLAS DE OFERTA OUTROS CURSOS',
          NO_SUBDEPENDENCIA_ADMIN: { $ne: 'SENAC' },
          MODALIDADE: 'EDUCAÇÃO PRESENCIAL',
          $or: [
            { NO_UNIDADE_ENSINO: /^INSTITUTO FEDERAL/ },
            { NO_UNIDADE_ENSINO: /^CENTRO FEDERAL/ }
          ]
        }
      ]
    }
  },
  {
    $lookup: {
      from: 'Sistec_Unidades_Ensino2022',
      localField: 'CÓDIGO UNIDADE DE ENSINO',
      foreignField: 'CO_UNIDADE_ENSINO',
      as: 'unidade_ensino'
    }
  },
  {
    $lookup: {
      from: 'sistec_cursos_unidades_senac',
      localField: 'CÓDIGO UNIDADE DE ENSINO',
      foreignField: 'CO_UNIDADE_ENSINO',
      as: 'curso_unidade_senac'
    }
  },
  {
    $unwind: '$unidade_ensino'
  },
  {
    $group: {
      _id: {
        MUNICÍPIO: '$MUNICÍPIO',
        CODIGO_CURSO: '$CÓDIGO CURSO',
        ESTADO: '$UF'
      },
      unidades: {
        $push: {
          NO_UNIDADE_ENSINO: '$NO_UNIDADE_ENSINO',
          CODIGO_MUNICIPIO: '$CÓDIGO MUNICÍPIO',
          LOGRADOURO: '$unidade_ensino.LOGRADOURO',
          NUMERO: '$unidade_ensino.NUMERO',
          BAIRRO: '$unidade_ensino.BAIRRO',
          ESTADO: '$ESTADO'
        }
      }
    }
  }, {
    $out: "ConcorrenciaEscolaEstado"
  }
]);
```