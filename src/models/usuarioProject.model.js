const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario.model');
const project = require('./project.model');

const UsuarioProject = sequelize.define('usuario_proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Usuario, key: 'id' }
    },

    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: project, key: 'id' }
    }
}, {
    tableName: 'usuario_proyectos',
    timestamps: false
});

module.exports = UsuarioProject;