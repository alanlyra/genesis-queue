db.getCollection("Estabelecimentos").aggregate([
  {
    $match: {
      Situacao_Cadastral: 2
    }
  },
  {
    $group: {
      _id: {
        municipio: "$Municipio",
        estado: "$UF",
        setor: "$CNAE_Fiscal_Principal_String"
      },
      total: { $sum: 1 }
    }
  },
  {
    $out: "EstabelecimentoAgregacao"
  }
]);



