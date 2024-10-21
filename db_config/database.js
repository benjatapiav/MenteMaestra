const mysql = require("promise-mysql")  ;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '960529@benemimar',
    database: 'mentemaestra'
})

const getConnection = async ()=> await connection;

module.exports = {
    getConnection
}