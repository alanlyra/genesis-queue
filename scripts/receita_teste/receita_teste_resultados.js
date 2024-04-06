db.receita_teste.aggregate([
    {
      $group: {
        _id: "$_id",
        Razao_Social: { $first: { $arrayElemAt: ["$Empresas.Razao_Social", 0 ] } },
        Capital_Social_Empresa: { $first: { $arrayElemAt: ["$Empresas.Capital_Social_Empresa", 0] } },
        Porte_Empresa: { $first: { $arrayElemAt: ["$Empresas.Porte_Empresa", 0 ] } },
        Opcao_Simples: { $first: { $arrayElemAt: ["$SimplesEmpresas.Opcao_Simples", 0 ] } },
        Opcao_MEI: { $first: { $arrayElemAt: ["$SimplesEmpresas.Opcao_MEI", 0 ] } },
        CNPJ_Basico: { $first: "$CNPJ_Basico" },
        CNAE_Fiscal_Principal: { $first: "$CNAE_Fiscal_Principal" },
        CNAE_Fiscal_Secundaria: { $first: "$CNAE_Fiscal_Secundaria" },
        Municipio: { $first: "$Municipio" },
        Data_Inicio_Atividade: { $first: "$Data_Inicio_Atividade" },
      }
    },
    {
        $out: "receita_teste_resultados"
    }
  ])