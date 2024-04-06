db.getCollection("RAIS_2021").aggregate([
    {
        $match: {
            "col_vinculo_ativo_31_12" : 1
        }
    },
    {
        $group: {
            _id: {
                estado: "$col_uf",
                ocupacao: "$col_cbo_2002",

            },
            estado: {$first: "$col_uf"},
            ocupacao: {$first: "$col_cbo_2002"},
            quantidade: { $sum: 1 } // Soma a quantidade de registros em cada grupo
        }
    },
    {
        $out: "Distribuicao_Pais"
    }
],    { allowDiskUse: true } )
