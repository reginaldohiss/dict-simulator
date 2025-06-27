module.exports = {
    format(data) {
        return {
            chave: data.chave,
            tipo: data.tipo,
            nome: data.nome,
            banco: data.banco,
            agencia: data.agencia,
            conta: data.conta,
            ativo: data.ativo,
            criadoEm: data.criadoEm
        };
    },

    collection(list) {
        return list.map(this.format);
    }
};
