db.Estabelecimentos.aggregate([
    {
      $lookup: {
        from: "Empresas",
        localField: "CNPJ_Basico",
        foreignField: "CNPJ_Basico",
        as: "empresas_dados"
      }
    },
    {
      $addFields: {
        empresas_dados: { $arrayElemAt: ["$empresas_dados", 0] }
      }
    },
    {
      $addFields: {
        "Capital_Social_Empresa" : "$empresas_dados.Capital_Social_Empresa",
        "Natureza_Juridica" : "$empresas_dados.Natureza_Juridica",
        "Porte_Empresa" : "$empresas_dados.Porte_Empresa",
        "Razao_Social" : "$empresas_dados.Razao_Social",
        "Qualificacao_Responsavel" : "$empresas_dados.Qualificacao_Responsavel"
      }
    },
    {
      $project: {
        empresas_dados: 0
      }
    },
    {
        $out: "EstabelecimentosEmpresas"
    }
  ]);

db.EstabelecimentosEmpresas.aggregate([
    {
      $lookup: {
        from: "SimplesEmpresas",
        localField: "CNPJ_Basico",
        foreignField: "CNPJ_Basico",
        as: "empresas_dados"
      }
    },
    {
      $addFields: {
        empresas_dados: { $arrayElemAt: ["$empresas_dados", 0] }
      }
    },
    {
      $addFields: {
          "Data_Exclusao_MEI" : "$empresas_dados.Data_Exclusao_MEI",
          "Data_Exclusao_Simples" : "$empresas_dados.Data_Exclusao_Simples",
          "Data_Opcao_MEI" : "$empresas_dados.Data_Opcao_MEI",
          "Data_Opcao_Simples" : "$empresas_dados.Data_Opcao_Simples",
          "Opcao_MEI" : "$empresas_dados.Opcao_MEI",
          "Opcao_Simples" : "$empresas_dados.Opcao_Simples"
      }
    },
    {
      $project: {
        empresas_dados: 0
      }
    },
    {
        $out: "EstabelecimentosEmpresasSimples"
    }
]);