db.getCollection("sistec_cursos_unidades_senac").aggregate([
    {
      $match: {
        NO_SUBDEPENDENCIA_ADMIN: 'SENAC',
        MODALIDADE: 'EDUCAÇÃO PRESENCIAL'
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
      $out: "SenacEscolaEstado"
    }
  ]);