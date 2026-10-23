const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_HOST:process.env.DB_HOST,
    DB_NAME:process.env.DB_NAME,
    DB_USUARIOS:process.env.DB_USUARIOS,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_PORT:process.env.DB_PORT
};   