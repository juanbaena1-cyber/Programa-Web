const listar = async (req, res) => {
  res.json({ mensaje: 'listar usuarios pendiente' });
};

module.exports = { listar };


const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// Crear usuario
const createUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol_id } = req.body;

    if (!nombre || !email || !password || !rol_id) {
      return res.status(400).json({
        mensaje: 'Nombre, email, contraseña y rol son obligatorios'
      });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un usuario con ese email'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol_id,
      administrador_id: req.Usuario.id
    });

    const { password: _, ...usuarioSeguro } = usuario.toJSON();

    return res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: usuarioSeguro
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
const updateUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol_id } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        id: req.params.id,
        administrador_id: req.Usuario.id
      }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    if (email && email !== usuario.email) {
      const emailExistente = await Usuario.findOne({
        where: { email }
      });

      if (emailExistente) {
        return res.status(409).json({
          mensaje: 'Ese email ya está registrado'
        });
      }
    }

    if (nombre !== undefined) usuario.nombre = nombre;
    if (email !== undefined) usuario.email = email;
    if (rol_id !== undefined) usuario.rol_id = rol_id;

    if (password) {
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();

    const { password: _, ...usuarioSeguro } = usuario.toJSON();

    return res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: usuarioSeguro
    });
  } catch (error) {
    next(error);
  }
};

// Listar usuarios administrados por el usuario autenticado
const getAllUsuarioByADMINId = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        administrador_id: req.Usuario.id
      },
      attributes: { exclude: ['password'] }
    });

    return res.json({ usuarios });
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
const deleteUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: req.params.id,
        administrador_id: req.Usuario.id
      }
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      });
    }

    await usuario.destroy();

    return res.json({
      mensaje: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
};

// Listar usuarios por rol dentro del administrador autenticado
const getAllUsuariosByRolId = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        rol_id: req.params.id,
        administrador_id: req.Usuario.id
      },
      attributes: { exclude: ['password'] }
    });

    return res.json({ usuarios });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createUsuario,
    updateUsuario,
    getAllUsuarioByADMINId,
    deleteUsuario,
    getAllUsuariosByRolId
};