const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const projectRoutes = require('./routes/project.routes');

app.use('/api/v1', authRoutes);
app.use('/api/v1', usuarioRoutes);
app.use('/api/v1', projectRoutes);

module.exports = app; 
