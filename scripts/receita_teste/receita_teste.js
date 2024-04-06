db.Estabelecimentos.aggregate([
  {
    $match: {
      UF: "RJ",
      Situacao_Cadastral: 2,
      $or: [
        { CNAE_Fiscal_Principal: /^56/ },
        { CNAE_Fiscal_Secundaria: /^56/ }
      ]
    }
  },
  {
    $lookup: {
      from: "Empresas",
      localField: "CNPJ_Basico",
      foreignField: "CNPJ_Basico",
      as: "Empresas"
    }
  },
  {
    $lookup: {
      from: "SimplesEmpresas",
      localField: "CNPJ_Basico",
      foreignField: "CNPJ_Basico",
      as: "SimplesEmpresas"
    }
  },
  {
      $out: "receita_teste"
  }
])