const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('role', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true // Es buena idea que los roles (ej. 'ADMIN', 'USER') no se repitan
    }
}, {
    tableName: 'roles', // Este nombre debe coincidir con la tabla de tu base de datos
    timestamps: false,
});

module.exports = Role;