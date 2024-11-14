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
app.get("/cursos/obtener", async (req,res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM CURSOS WHERE id_curso >=1 AND id_curso <= 6");
    res.json(result)
    console.log(result);
    
})

app.get("/cursos/cursos_comprados", async (req,res) =>{
    const connection = await database.getConnection();
    const [cursos] = await connection.query(`
        SELECT cursos.id_cursos, cursos.titulo, cursos.url_video, cursos.categoria
        FROM cursos
        JOIN compras ON cursos.id_cursos = cursos_comprados.id_curso
        `)
})


