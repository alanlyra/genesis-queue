# EstabelecimentosFinal

## Fontes 

[CNPJ](../../CNPJ.md) > [[Estabelecimentos](../raizes/Estabelecimentos.md), [Empresas](../raizes/Empresas.md)] > [EstabelecimentosEmpresas](../intermediarias/EstabelecimentosEmpresas.md) > [EstabelecimentosEmpresasSimples](../intermediarias/EstabelecimentosEmpresasSimples.md) > [EstabelecimentosEmpresasSimplesMod](../intermediarias/EstabelecimentosEmpresasSimplesMod.md) > [EstabelecimentosFinal](./EstabelecimentosFinal.md)

## Como gerar

1. Executar a seguinte agregação sobre a coleção [EstabelecimentosEmpresasSimplesMod](../intermediarias/EstabelecimentosEmpresasSimplesMod.md):

```
db.EstabelecimentosEmpresasSimplesMod.aggregate([
  {
    $lookup: {
      from: "CNAE_div_agg",
      localField: "CNAE_Fiscal_Principal_String",
      foreignField: "divisao_cod",
      as: "CNAE_Divisao"
    }
  },
  {
    $unwind: "$CNAE_Divisao"
  },
  {
    $addFields: {
      CNAE_Fiscal_Principal_Text: "$CNAE_Divisao.divisao_nome_agg"
      
    }
  },
  {
    $project: {
      CNAE_Divisao: 0 // Remover o campo CNAE_Divisao
    }
  },
  {
    $lookup: {
      from: "MunicipiosTOM",
      localField: "Municipio",
      foreignField: "CÓDIGO DO MUNICÍPIO - TOM",
      as: "MunicipioTOM"
    }
  },
  {
    $unwind: "$MunicipioTOM"
  },
  {
    $addFields: {
      MunicipioText: "$MunicipioTOM.MUNICÍPIO - IBGE"
      
    }
  },
  {
    $project: {
      MunicipioTOM: 0
    }
  },
  {
    $merge: {
      into: "EstabelecimentosFinal",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
], {allowDiskUse: true});`
```

2. Criar índices da nova coleção criada:

```
/*Capital_Social_Empresa_Mod*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"Capital_Social_Empresa_Mod":1})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"Capital_Social_Empresa_Mod":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"Capital_Social_Empresa_Mod":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"Capital_Social_Empresa_Mod":-1})

/*Nome_Fantasia*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"Nome_Fantasia":1})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"Nome_Fantasia":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"Nome_Fantasia":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"Nome_Fantasia":-1})

/*Porte_Empresa*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"Porte_Empresa":1})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"Porte_Empresa":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"Porte_Empresa":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"Porte_Empresa":-1})

/*Data_Inicio_Atividade*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"Data_Inicio_Atividade":1})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"Data_Inicio_Atividade":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"Data_Inicio_Atividade":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"Data_Inicio_Atividade":-1})


/*Opcao_Simples*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"Opcao_Simples":1})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"Opcao_Simples":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"Opcao_Simples":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"Opcao_Simples":-1})


/*Opcao_MEI*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"Opcao_MEI":1})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"Opcao_MEI":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"Opcao_MEI":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"Opcao_MEI":-1})

/*CNAE_Fiscal_Principal_Text*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"CNAE_Fiscal_Principal_Text":-1,})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"CNAE_Fiscal_Principal_Text":-1,})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"CNAE_Fiscal_Principal_Text":-1,})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"CNAE_Fiscal_Principal_Text":-1,})

/*MunicipioText*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":1,"MunicipioText":-1,})
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"MunicipioText":-1,})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":1,"MunicipioText":-1,})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"MunicipioText":-1,})


/*Outros*/
db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1,"Situacao_Cadastral":1,"UF":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1,"UF":-1})
db.getCollection("EstabelecimentosFinal").createIndex({"Situacao_Cadastral":1})

db.getCollection("EstabelecimentosFinal").createIndex({"CNAE_Fiscal_Principal_String":1})
db.getCollection("EstabelecimentosFinal").createIndex({"Municipio":1})
```

3. Atualizar nomes substituindo o nome fantasia pela razão social em estabelecimentos que não possuem o nome fantasia preenchido na nova coleção criada:

```
db.EstabelecimentosFinal.updateMany(
  {Nome_Fantasia: null},
  [
    {
      $set: {
        Nome_Fantasia_Real: "$Nome_Fantasia"
      }
    },
    {
      $set: {
        Nome_Fantasia: {
          $cond: {
            if: { $ne: ["$Nome_Fantasia", null] },
            then: { $trim: { input: "$Nome_Fantasia" } },
            else: { $trim: { input: "$Razao_Social" } }
          }
        }
      }
    }
  ]
)
```
4. Modificar os campos referentes ao Simples Nacional e MEI para todos os documentos terem o mesmo número de campos:

```
db.EstabelecimentosFinal.update(
   { ": 1,Data_Exclusao_MEI": 1,: { $exists: false } },
   { $set: { ": 1,Data_Exclusao_MEI": 1,: null } },
   { multi: true }
)

db.EstabelecimentosFinal.update(
   { ": 1,Data_Exclusao_Simples": 1,: { $exists: false } },
   { $set: { ": 1,Data_Exclusao_Simples": 1,: null } },
   { multi: true }
)

db.EstabelecimentosFinal.update(
   { ": 1,Data_Opcao_MEI": 1,: { $exists: false } },
   { $set: { ": 1,Data_Opcao_MEI": 1,: null } },
   { multi: true }
)

db.EstabelecimentosFinal.update(
   { ": 1,Data_Opcao_Simples": 1,: { $exists: false } },
   { $set: { ": 1,Data_Opcao_Simples": 1,: null } },
   { multi: true }
)

db.EstabelecimentosFinal.update(
   { ": 1,Opcao_MEI": 1,: { $exists: false } },
   { $set: { ": 1,Opcao_MEI": 1,: null } },
   { multi: true }
)

db.EstabelecimentosFinal.update(
   { ": 1,Opcao_Simples": 1,: { $exists: false } },
   { $set: { ": 1,Opcao_Simples": 1,: null } },
   { multi: true }
)
```