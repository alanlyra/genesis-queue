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
], {allowDiskUse: true});