const { dataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario.model');

const project = sequelize.define('project', {
    id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: dataTypes.STRING, allowNull: false },
    descripcion: { type: dataTypes.STRING, allowNull: false },
    fecha_cracion: {
         type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },

    administrador_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: { model: Usuario, key: 'id' }
    }
}, {
    tableName: 'proyectos',
    timestamps: false,
    hooks: {
        aftercreate: (project, options) => {
            if (project.fecha_cracion) {
                project.fecha_cracion.sethours(project.fecha_cracion.getHours() - 5);
            }
        }
    }
}); 

module.exports = project;