const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.createProject);
router.put('/projects/update', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.updateProject);
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.deleteProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMINISTRADOR, ROLES.USUARIO]), projectController.getAllProjects);
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMINISTRADOR, ROLES.USUARIO]), projectController.getProjectById);

router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.assingUserToProject);
router.delete('/projects/desassociate', authenticateToken, checkRole([ROLES.ADMINISTRADOR]), projectController.removeUserFromProject);

module.exports = router;                 