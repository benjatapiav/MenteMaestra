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

//obtener cursos random
app.get("/cursos/obtener", async (req,res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM CURSOS WHERE id_curso >=1 AND id_curso <= 6");
    res.json(result)
    console.log(result);

    
})
// Obtener cursos comprados
app.get("/cursos/:userId/cursos_comprados", async (req,res) =>{
    // uderId es el parametro que usaremos para definir cada estudiante por su ID
    const userId = req.params.userId;
    try{
        const connection = await database.getConnection();
        
        const [cursos] = await connection.query(`
            SELECT cursos.id_curso, cursos.descripcion, cursos.precio, cursos.nombre_canal, cursos.nombre_profesor, cursos.url_imagen, cursos.titulo, cursos.url_video, cursos.categoria
            FROM cursos
            JOIN cursos_comprados
            ON cursos.id_curso = cursos_comprados.id_curso
            WHERE cursos_comprados.id_estudiante = ?
            ORDER BY cursos.categoria;
            `,[userId]);

            if (Array.isArray(cursos) && cursos.length > 0) {
                // Si cursos es un arreglo, lo enviamos como respuesta JSON
                res.json(cursos);
            } else {
                // Si no es un arreglo, devolvemos un arreglo con el curso
                res.json([cursos]);
            }

            //console.log("Cursos comprados por usuario: ",cursos);
            //res.json(Array.isArray(cursos) ? cursos : [cursos]);

    }catch (error){
        console.log("Error al obtener los cursos comprados", error);
        res.status(500).json({ message: 'Error al obtener los cursos comprados'});
    }
});


