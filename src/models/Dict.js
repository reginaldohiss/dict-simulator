const mongoose = require('mongoose');

const dictSchema = new mongoose.Schema({
    chave: { type: String, required: true, unique: true },
    tipo: { type: String, enum: ['cpf', 'email', 'telefone', 'aleatoria'], required: true },
    nome: { type: String, required: true },
    banco: { type: String, required: true },
    agencia: { type: String, required: true },
    conta: { type: String, required: true },
    ativo: { type: Boolean, default: true },
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dict', dictSchema);
