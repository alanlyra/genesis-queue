# sistec_cursos_unidades_senac

## Fontes 

[SisTec](../../SISTEC.md) > [[Sistec_Unidades_Ensino2022](../raizes/Sistec_Unidades_Ensino2022.md),[Sistec_Cursos_Tecnicos_ativos2022](../raizes/Sistec_Cursos_Tecnicos_ativos2022.md)] > [sistec_cursos_unidades_senac](./sistec_cursos_unidades_senac.md)

## Como gerar

1. Com as coleções ["Sistec_Unidades_Ensino2022"](../raizes/Sistec_Unidades_Ensino2022.md) e ["Sistec_Cursos_Tecnicos_ativos2022"](../raizes/Sistec_Cursos_Tecnicos_ativos2022.md), executar a seguinte agregação:

```
db.getCollection("Sistec_Cursos_Tecnicos_ativos2022").aggregate([
  {
    $lookup: {
      from: "Sistec_Unidades_Ensino2022",
      localField: "CÓDIGO UNIDADE DE ENSINO",
      foreignField: "CO_UNIDADE_ENSINO",
      as: "unidade_ensino"
    }
  },
  {
    $unwind: "$unidade_ensino"
  },
  {
    $project: {
		_id: 0,
		"NOME SUBTIPO DE CURSOS" : 1,
        "CÓDIGO CURSO" : 1,
		"CURSO" : 1,
		"EIXO TECNOLÓGICO" : 1,
		"MODALIDADE" : 1,
		"CARGA HORÁRIA CURSO" : 1,
		"SITUACAO ATIVO" : 1,
		"CÓDIGO UNIDADE DE ENSINO" : 1,
		"UNIDADE DE ENSINO" : 1,
		"MUNICÍPIO" : 1,
		"UF" : 1,
		"CÓDIGO MUNICÍPIO" : 1,
		NO_TIPO_ESCOLA: "$unidade_ensino.NO_TIPO_ESCOLA",
		NO_UNIDADE_ENSINO: "$unidade_ensino.NO_UNIDADE_ENSINO",
		NO_SUBDEPENDENCIA_ADMIN: "$unidade_ensino.NO_SUBDEPENDENCIA_ADMIN"
    }
  },
  {
    $out: "sistec_cursos_unidades_senac"
  }
]);
```