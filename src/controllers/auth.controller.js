const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');

// Aseguramos la carga correcta del archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Importa tu modelo de Usuario según tu estructura
const Usuario = require('../models/usuario.model'); 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar que vengan las credenciales
    if (!email || !password) {
      return res.status(400).json({ 
        mensaje: 'Por favor, proporciona email y contraseña' 
      });
    }

    // 2. Buscar al usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ 
        mensaje: 'Usuario no encontrado' 
      });
    }

    // 3. Verificar la contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ 
        mensaje: 'Contraseña incorrecta' 
      });
    }

    // 4. Generar el Token JWT
    // IMPORTANTE: Se usa process.env.JWT_KEY para coincidir exactamente con el middleware
    const payload = { 
      id: usuario.id, 
      email: usuario.email,
      role_id: usuario.role_id 
    };

    const token = jwt.sign(
      payload, 
      process.env.JWT_KEY, 
      { expiresIn: '8h' }
    );

    // 5. Responder con los datos del usuario y el token
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Error en el proceso de login:', error);
    return res.status(500).json({ 
      mensaje: 'Error interno del servidor al iniciar sesión',
      error: error.message 
    });
  }
};

module.exports = { login };