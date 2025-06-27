const DictRepository = require('../repositories/DictRepository');

module.exports = {
    async create(data) {
        return await DictRepository.create(data);
    },

    async findByKey(chave) {
        return await DictRepository.findByChave(chave);
    },

    async findByName(nome) {
        return await DictRepository.findByNome(nome);
    },

    async update(chave, data) {
        return await DictRepository.update(chave, data);
    },

    async disable(chave) {
        return await DictRepository.update(chave, { ativo: false });
    }
};
