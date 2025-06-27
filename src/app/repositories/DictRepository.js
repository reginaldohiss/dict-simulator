const Dict = require('../../models/Dict');

module.exports = {
    async create(data) {
        return await Dict.create(data);
    },

    async findByChave(chave) {
        return await Dict.findOne({ chave });
    },

    async findByNome(nome) {
        return await Dict.find({ nome: new RegExp(nome, 'i') });
    },

    async update(chave, data) {
        return await Dict.findOneAndUpdate({ chave }, data, { new: true });
    }
};
