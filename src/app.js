const express = require('express');
const app = express();
const dictRoutes = require('./routes/dict.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

app.use(express.json());
app.use('/api/dict', dictRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
