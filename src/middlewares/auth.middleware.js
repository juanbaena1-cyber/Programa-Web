const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
 
dotenv.config();

const SECRET_KEY = process.env.JWT_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.headers('authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    jwt.verify(token, SECRET_KEY, (err, Usuario) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.Usuario = Usuario;
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id } = req.Usuario?.rol_id;

        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'Acceso denegado, rol no autorizado' });
        }

        next();
    };
};

module.exports = { authenticateToken, checkRole };