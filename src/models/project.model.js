const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario.model');

const project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    fecha_cracion: {
         type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },

    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Usuario, key: 'id' }
    }
}, {
    tableName: 'proyectos',
    timestamps: false,
    hooks: {
        afterCreate: (project, options) => {
            if (project.fecha_cracion) {
                project.fecha_cracion.setHours(project.fecha_cracion.getHours() - 5);
            }
        }
    }
}); 

module.exports = project;