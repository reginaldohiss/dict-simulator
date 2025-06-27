require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`);
        });
    })
    .catch(err => console.error('Erro ao conectar no MongoDB:', err));
