/**
 * @swagger
 * tags:
 *   name: DICT
 *   description: Gerenciamento de chaves Pix
 */

const express = require('express');
const router = express.Router();
const DictController = require('../app/controllers/DictController');
const validate = require('../app/formRequests/dictRequest');

/**
 * @swagger
 * /dict:
 *   post:
 *     summary: Cadastra uma nova chave Pix
 *     tags: [DICT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chave
 *               - tipo
 *               - nome
 *               - banco
 *               - agencia
 *               - conta
 *             properties:
 *               chave:
 *                 type: string
 *                 example: "reginaldo@exemplo.com"
 *               tipo:
 *                 type: string
 *                 enum: [email, cpf, telefone, aleatoria]
 *               nome:
 *                 type: string
 *                 example: "Reginaldo Silva"
 *               banco:
 *                 type: string
 *                 example: "260 - Bank Pagamentos"
 *               agencia:
 *                 type: string
 *                 example: "0001"
 *               conta:
 *                 type: string
 *                 example: "12345678-9"
 *     responses:
 *       201:
 *         description: Chave criada com sucesso
 *       409:
 *         description: Chave já existente
 *       422:
 *         description: Dados inválidos
 */
router.post('/', validate.store, DictController.store);

/**
 * @swagger
 * /dict/{chave}:
 *   get:
 *     summary: Consulta uma chave Pix
 *     tags: [DICT]
 *     parameters:
 *       - in: path
 *         name: chave
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave Pix a ser consultada
 *     responses:
 *       200:
 *         description: Chave encontrada
 *       404:
 *         description: Chave não encontrada
 */
router.get('/:chave', DictController.show);

/**
 * @swagger
 * /dict:
 *   get:
 *     summary: Lista chaves de um cliente
 *     tags: [DICT]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do titular das chaves
 *     responses:
 *       200:
 *         description: Lista de chaves
 */
router.get('/', DictController.index);

/**
 * @swagger
 * /dict/{chave}:
 *   put:
 *     summary: Atualiza dados de uma chave Pix
 *     tags: [DICT]
 *     parameters:
 *       - in: path
 *         name: chave
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               banco:
 *                 type: string
 *               agencia:
 *                 type: string
 *               conta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atualizado com sucesso
 *       422:
 *         description: Dados inválidos
 */
router.put('/:chave', validate.update, DictController.update);

/**
 * @swagger
 * /dict/{chave}:
 *   delete:
 *     summary: Desativa uma chave Pix
 *     tags: [DICT]
 *     parameters:
 *       - in: path
 *         name: chave
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chave desativada com sucesso
 */
router.delete('/:chave', DictController.destroy);

module.exports = router;
