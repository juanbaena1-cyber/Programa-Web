const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Usuarios = require('../models/usuarios.model');
const RolesPermisos = require('../models/rolesPermisos.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUsuario = async (email, password) => {
    try {
        // Verificar si el usuario existe
        const Usuario = await Usuario.findOne({ where: { email } });
        if ( Usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, Usuario.password);
        if (!isPasswordValid){
            throw new error ('Contraseña Incorrecta');
        }

        // Consultar permiso del rol 
        const rolesPermisos = await RolePermission.findAll({
            where: { rol_id: Usuario.rol_id },
            attributes: ['Permiso_id']
        });

        const permisos = rolesPermisos.map(rp => rp.permiso_id);

        // Generar un token JWT 
        const token = jwt.sign(
            {id: Usuario.id, nombre: Usuario.nombre, email: Usuario.email, rol_id: Usuario.rol_id, permisos},
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};