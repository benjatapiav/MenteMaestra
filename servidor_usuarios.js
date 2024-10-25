const express = require("express");
const database = require("./db_config/database");  // Asegúrate de que esta ruta esté bien configurada
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
app.use(express.json());  // Middleware para parsear JSON

// Rutas
app.get("/usuarios", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const [result] = await connection.query("SELECT * FROM USUARIOS WHERE id_usuarios >= 1");
        res.json(result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

app.post("/usuarios", async (req, res) => {
    try {
        const { nombre, apellido, correo, clave, rol, nombreCanal, categoria } = req.body;
        const connection = await database.getConnection();
        await connection.query("INSERT INTO USUARIOS(nombre, apellido, correo, rol, clave, nombreCanal, categoria) VALUES(?,?,?,?,?,?,?)", [nombre, apellido, correo, rol, clave, nombreCanal, categoria]);
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});
