const Usuario = require('./usuario.model');
const project = require('./project.model');
const UsuarioProject = require('./usuarioProject.model');
const Role = require('./role.model');
const RolePermission = require('./rolePermission.model');

// Relaciones muchos a muchos
Usuario.belongsToMany(project, { through: UsuarioProject, foreignKey: 'usuario_id', as: 'projects' });
project.belongsToMany(Usuario, { through: UsuarioProject, foreignKey: 'proyecto_id', as: 'users' });
Role.belongsToMany(RolePermission, { through: RolePermission, foreignKey: 'rol_id', otherKey: 'permiso_id' });
RolePermission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permiso_id', otherKey: 'rol_id' });

// Relacion de administrador
project.belongsTo(Usuario, { foreignKey: 'administrador_id', as: 'administrador' });

module.exports = {Usuario, project, UsuarioProject, Role, RolePermission};