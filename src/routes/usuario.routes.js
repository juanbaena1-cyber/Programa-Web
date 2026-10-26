const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Ruta de usuarios
router.post('/usuarios/create', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), usuarioController.createUsuario);
router.put('/usuarios/update/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), usuarioController.updateUsuario);
router.get('/usuarios', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), usuarioController.getAllUsuarioByAdministradorId);
router.delete('/usuarios/delete/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), usuarioController.deleteUsuario);
router.get('/usuarios/rol/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), usuarioController.getAllUsuariosByRolId);

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;
