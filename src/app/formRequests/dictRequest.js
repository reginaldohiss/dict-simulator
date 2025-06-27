const Joi = require('joi');
const Dict = require('../../models/Dict');

const regexTelefone = /^\+?[1-9][0-9]{7,14}$/;
const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const baseSchema = Joi.object({
    chave: Joi.alternatives()
        .conditional('tipo', [
            {
                is: 'email',
                then: Joi.string().email().required().messages({
                    'string.email': 'O campo chave deve conter um e-mail válido.',
                    'any.required': 'A chave é obrigatória para o tipo email.'
                })
            },
            {
                is: 'telefone',
                then: Joi.string().pattern(regexTelefone).required().messages({
                    'string.pattern.base': 'O telefone informado é inválido.',
                    'any.required': 'A chave é obrigatória para o tipo telefone.'
                })
            },
            {
                is: 'cpf',
                then: Joi.string().pattern(regexCPF).required().messages({
                    'string.pattern.base': 'O CPF informado é inválido.',
                    'any.required': 'A chave é obrigatória para o tipo CPF.'
                })
            },
            {
                is: 'aleatoria',
                then: Joi.string().guid({ version: 'uuidv4' }).required().messages({
                    'string.guid': 'A chave aleatória deve ser um UUID v4 válido.',
                    'any.required': 'A chave é obrigatória para o tipo aleatória.'
                })
            }
        ]),
    tipo: Joi.string()
        .valid('cpf', 'email', 'telefone', 'aleatoria')
        .required()
        .messages({
            'any.only': 'O tipo deve ser cpf, email, telefone ou aleatoria.',
            'any.required': 'O campo tipo é obrigatório.'
        }),
    nome: Joi.string().min(3).max(80).required().messages({
        'string.base': 'O nome deve ser um texto.',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres.',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres.',
        'any.required': 'O campo nome é obrigatório.'
    }),
    banco: Joi.string().min(3).max(60).required().messages({
        'string.min': 'O banco deve ter no mínimo {#limit} caracteres.',
        'string.max': 'O banco deve ter no máximo {#limit} caracteres.',
        'any.required': 'O campo banco é obrigatório.'
    }),
    agencia: Joi.string().pattern(/^\d{4}$/).required().messages({
        'string.pattern.base': 'A agência deve conter 4 dígitos numéricos.',
        'any.required': 'O campo agência é obrigatório.'
    }),
    conta: Joi.string().pattern(/^\d{5,12}-?\d{0,1}$/).required().messages({
        'string.pattern.base': 'A conta deve ter entre 5 a 12 dígitos, com um dígito verificador opcional.',
        'any.required': 'O campo conta é obrigatório.'
    })
});

exports.store = async (req, res, next) => {
    const { error } = baseSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ error: error.details[0].message });
    }

    const exists = await Dict.findOne({ chave: req.body.chave });
    if (exists) {
        return res.status(409).json({ error: 'Chave Pix já registrada.' });
    }

    next();
};

exports.update = (req, res, next) => {
    const updateSchema = Joi.object({
        nome: Joi.string().min(3).max(80).messages({
            'string.min': 'O nome deve ter no mínimo {#limit} caracteres.',
            'string.max': 'O nome deve ter no máximo {#limit} caracteres.'
        }),
        banco: Joi.string().min(3).max(60).messages({
            'string.min': 'O banco deve ter no mínimo {#limit} caracteres.',
            'string.max': 'O banco deve ter no máximo {#limit} caracteres.'
        }),
        agencia: Joi.string().pattern(/^\d{4}$/).messages({
            'string.pattern.base': 'A agência deve conter 4 dígitos numéricos.'
        }),
        conta: Joi.string().pattern(/^\d{5,12}-?\d{0,1}$/).messages({
            'string.pattern.base': 'A conta deve ter entre 5 a 12 dígitos, com um dígito verificador opcional.'
        })
    });

    const { error } = updateSchema.validate(req.body);
    return error
        ? res.status(422).json({ error: error.details[0].message })
        : next();
};
