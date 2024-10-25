const express = require("express");
const database = require("./db_config/database");
const morgan = require("morgan");
const cors = require("cors");

//Configuracion inicial
const app = express();
app.set("port",5500);
app.listen(app.get("port"), ()=>{
    console.log('Escuchando comunicaciones al puerto: '+app.get('port'));

});


app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Rutas
app.get("/cursos", async (req,res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM CURSOS WHERE id_cursos >=1 AND id_cursos <= 6");
    res.json(result)
    console.log(result);
    
})



