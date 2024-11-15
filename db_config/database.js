// conexion servicio CURSOS
const mysql = require("promise-mysql");
const dotenv = require("dotenv");
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port
})

const getConnection = async ()=> await connection;

module.exports = {
    getConnection

}

