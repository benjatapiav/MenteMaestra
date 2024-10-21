const express = require('express');


//Configuracion inicial
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log('Escuchando comunicaciones al puerto: '+app.get('port'));


//MiddleWares


//Rutas

