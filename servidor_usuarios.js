const express = require("express");
const database = require("./db_config/database");  
const morgan = require("morgan");
const cors = require("cors");

// Configuración inicial
const app = express();
app.set("port", 5501);
app.listen(app.get("port"), () => {
    console.log('Escuchando comunicaciones al puerto: ' + app.get('port'));
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());  

// Registrar usuario
app.post('/usuarios', async (req,res) =>{ 

    try{
        const {tipoUsuario, rutEstudiante,nombreEstudiante,apellidoEstudiante
            ,correoEstudiante,claveEstudiante,rutProfesor,nombreProfesor,
            apellidoProfesor,correoProfesor,claveProfesor,nombreCanal,categoria} = req.body; //Guardamos todos los valores que aparecen en el formulario

        const connection = await database.getConnection();
        //Determinar los valores de RUT y Tabla segun corresponda
        let valorRut;
        // Verificacion de si el RUT ya extiste en la BBDD
        if(tipoUsuario === 'estudiante'){
            valorRut = await connection.query('SELECT rut FROM estudiantes WHERE rut = ?',[rutEstudiante]);
            if(valorRut.length > 0){ //Condicion para usuario existente en tabla estudiantes
                res.status(409).json({message: 'Usuario ya existe'});
            } else{
                await connection.query('INSERT INTO estudiantes (rut,nombre,apellido,correo,clave) VALUES (?,?,?,?,?)',[rutEstudiante,nombreEstudiante,
                apellidoEstudiante,correoEstudiante,claveEstudiante]);
                res.status(201).json({message: 'Estudiante registrado exitosamente'});
            }
        }
        else if(tipoUsuario === 'profesor'){
            valorRut = await connection.query('SELECT rut FROM profesores WHERE rut = ?',[rutProfesor]);
            if(valorRut.length > 0){ //Condicion para usuario existente en tabla profesores
                res.status(409).json({message: ' Usuario ya existe'});
            }else{
                await connection.query('INSERT INTO profesores (rut,nombre,apellido,correo,clave,nombreCanal,categoria) VALUES (?,?,?,?,?,?,?)',[rutProfesor,
                nombreProfesor,apellidoProfesor,correoProfesor,claveProfesor,nombreCanal,categoria]);
                res.status(201).json({message: 'Profesor registrado exitosamente'});
            }
        }
        else{
            res.status(400).json({message: 'Rol no valido'});
        }
    }catch(error){
        console.error('Error al Registrar usuario',error);
        res.status(201).json({message: 'Error al registrar usuario'});
    }

})
