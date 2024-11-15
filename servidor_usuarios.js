// LLamando las dependencias a usar
const express = require("express");
const database = require("./db_config/database");  
const morgan = require("morgan");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
app.post('/usuarios/registro', async (req,res) =>{ 

    try{
        const {tipoUsuario, rutEstudiante,nombreEstudiante,apellidoEstudiante
            ,correoEstudiante,claveEstudiante,rutProfesor,nombreProfesor,
            apellidoProfesor,correoProfesor,claveProfesor,nombreCanal,categoria} = req.body; //Guardamos todos los valores que aparecen en el formulario
            
        const connection = await database.getConnection();
            
        const hashedClaveEstudiante = await bcrypt.hash(claveEstudiante, 10);
        const hashedClaveProfesor = await bcrypt.hash(claveProfesor, 10);
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

});
//------------------------------------------------------------------------------------------------------------------
// logear usuario
//Encontrar usuario segun correo

app.post('/usuarios/login', async (req,res)=>{

    const {correo,clave} = req.body;
    

    try{
        console.log('correo: ',correo,'Clave: ',clave);
        //Genera coneccion
        console.log('intentando conectar a la base de datos');
        const connection = await database.getConnection();
        console.log('Conexion a la base de datos exitosa');
        //Crea un arreglo con los valores de correo del usuario que corresponda
        const [usuarios] = await connection.query(`
            SELECT id_estudiante AS userId, correo,clave,nombre,apellido FROM estudiantes WHERE correo = ? 
            UNION 
            SELECT id_profesor AS userId, correo,clave,nombre,apellido FROM profesores WHERE correo = ?
            `, [correo, correo]);
            
            console.log('Ejecucion de consulta por correo: ',correo,' exitosa');
            

            // Verifica si usuarios obtuvo los datos de la consulta query
            if (usuarios.length === 0){
                console.log('Usuario no encontrado')
                return res.status(401).json({message: ' Usuario no encontrado'});
            }else{
                console.log('Existen valores');
                console.log('usuarios encontrados: ',usuarios);
            };

            if(usuarios.clave === clave ){
                console.log('clave correcta');
                res.json({
                    message: 'Login exitoso',
                    usuario:{
                        userId: usuarios.userId,
                        correo: usuarios.correo,
                        nombre: usuarios.nombre,
                        apellido: usuarios.apellido
                    }
                });
            }else{
                return res.status(401).json({ message: 'Correo o Clave incorrecta' });
            }
               
    }catch (error){
        console.error('Error en el login: ',error);
        res.status(500).json({message: 'Error en el servidor'});
    }
});