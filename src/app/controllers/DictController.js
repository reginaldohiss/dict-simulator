const DictService = require('../services/DictService');
const DictResource = require('../resources/DictResource');

module.exports = {
    async store(req, res) {
        const created = await DictService.create(req.body);
        return res.status(201).json(DictResource.format(created));
    },

    async show(req, res) {
        const result = await DictService.findByKey(req.params.chave);
        if (!result) return res.status(404).json({ error: 'Chave não encontrada' });
        return res.json(DictResource.format(result));
    },

    async index(req, res) {
        const list = await DictService.findByName(req.query.nome || '');
        return res.json(DictResource.collection(list));
    },

    async update(req, res) {
        const updated = await DictService.update(req.params.chave, req.body);
        return res.json(DictResource.format(updated));
    },

    async destroy(req, res) {
        const disabled = await DictService.disable(req.params.chave);

        if (!disabled) {
            return res.status(200).json({ ativo: false, chave: req.params.chave });
        }

        return res.json(DictResource.format(disabled));
    }
};
