const express = require('express');
const database = require("./db_config/database");
const morgan = require("morgan");
const cors = require("cors");

//Configuracion inicial
const app = express();
app.set("port",5500);
app.listen(app.get("port"));
console.log('Escuchando comunicaciones al puerto: '+app.get('port'));

//ss
//MiddleWares
app.use(morgan("dev"));
app.use(cors({
    origin:["http://127.0.0.1:5500"]
}));
app.use(express.json());

//Rutas
app.get("/cursos", async (req,res) => {
    const connection = await database.getConnection();
    const result = connection.query("SELECT * FROM CURSOS");
    console.log(result);
})

//Conexion base de datos

