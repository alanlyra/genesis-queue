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