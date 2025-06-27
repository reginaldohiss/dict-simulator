const request = require('supertest');
const app = require('../src/app');
const Dict = require('../src/models/Dict');

describe('✅ DICT API - Testes completos', () => {
    beforeEach(async () => {
        await Dict.deleteMany({});
    });

    const payload = {
        chave: 'reginaldo@email.com',
        tipo: 'email',
        nome: 'Reginaldo Silva',
        banco: '260 - Nubank',
        agencia: '0001',
        conta: '12345678-9'
    };

    it('deve criar uma nova chave Pix válida', async () => {
        const res = await request(app).post('/api/dict').send(payload);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('chave', payload.chave);
    });

    it('deve rejeitar chave Pix duplicada', async () => {
        await Dict.create(payload);
        const res = await request(app).post('/api/dict').send(payload);
        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty('error');
    });

    it('deve buscar uma chave Pix existente', async () => {
        await Dict.create(payload);
        const res = await request(app).get(`/api/dict/${payload.chave}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('nome', payload.nome);
    });

    it('deve retornar 404 para chave Pix inexistente', async () => {
        const res = await request(app).get('/api/dict/inexistente@email.com');
        expect(res.statusCode).toBe(404);
    });

    it('deve listar chaves por nome (parcial)', async () => {
        await Dict.create(payload);
        const res = await request(app).get('/api/dict?nome=Reginaldo');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('deve atualizar dados de uma chave Pix existente', async () => {
        await Dict.create(payload);
        const res = await request(app)
            .put(`/api/dict/${payload.chave}`)
            .send({ nome: 'Reginaldo J. Silva' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('nome', 'Reginaldo J. Silva');
    });

    it('deve retornar 200 ao desativar uma chave Pix existente', async () => {
        await Dict.create(payload);
        const res = await request(app).delete(`/api/dict/${payload.chave}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('ativo', false);
    });

    it('deve permitir desativar mesmo uma chave inexistente (sem erro)', async () => {
        const res = await request(app).delete('/api/dict/invalida@email.com');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('ativo', false);
    });
});
