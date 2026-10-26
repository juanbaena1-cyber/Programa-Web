const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Ruta de usuarios
router.post('/usuarios/create', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.createUsuario);
router.put('/usuarios/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.updateUsuario);
router.get('/usuarios', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.getAllUsuarioByADMINId);
router.delete('/usuarios/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.deleteUsuario);
router.get('/usuarios/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.getAllUsuariosByRolId);

console.log('authenticateToken:', typeof authenticateToken);
console.log('checkRole:', typeof checkRole);
console.log('ROLES.ADMIN:', ROLES.ADMIN);
console.log('createUsuario:', typeof usuarioController.createUsuario);
// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;
