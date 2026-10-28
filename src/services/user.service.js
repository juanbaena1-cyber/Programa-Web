const Usuario = require('./models/Usuario.model');
const bcrypt = require('bcryptjs');

exports.createUsuario = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const UsuarioExists = await Usuario.findOne ({ where: { email } });
        if (UsuarioExists) {
            throw new Error('El usuario no existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUsuario = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUsuario;
    } catch (err) {
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

exports.updateUsuario = async (id, nombre, email, rol_id, administrador_id, admin_for_token) => {
    try {
        const Usuario = await Usuario.findByPk(id);
        if(Usuario.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, el usuario no existe');
        }

        if (!Usuario) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== Usuario.email) {
            const UsuarioExists = await Usuario.findOne({ where: { email } });
            if (UsuarioExists) {
                throw new Error('El email ya está en uso');
            }
        }
        await Usuario.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        return Usuario;
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

exports.getAllUsuarioByAdministradorId = async (administrador_id, email) => {
    try {
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }
        const usuarios = await Usuario.findAll({ where: whereClause, attributes: { exclude: ['password'] } });
        return usuarios;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

exports.deleteUsuario = async (id, admin_for_token) => {
    try {
        const Usuario = await Usuario.findByPk(id);
        if (Usuario.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, el usuario no existe');
        }

        if (!Usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        await Usuario.destroy();
        return { message: 'Usuario eliminado correctamente' };
    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};

exports.getAllUsuarioByRolId = async (rol_id) => {
    try {
        const usuarios = await Usuario.findAll({ where: { rol_id }, attributes: { exclude: ['password'] }});
        return usuarios; 
    } catch (err) {
        throw new Error(`Error al obtener los usuarios por rol: ${err.message}`);
    }
};
