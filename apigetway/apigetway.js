const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());


// Conexion entre APIgetway y ApiRest
app.use("/api/usuarios", createProxyMiddleware({
  target: "http://localhost:5501/usuarios",
  changeOrigin: true
}));

app.use("/api/cursos", createProxyMiddleware({
  target: "http://localhost:5500/cursos",
  changeOrigin: true
}));


// Comprobacion si la APIgetway funciona correctamente
app.listen(PORT,()=>{
  console.log(`API gateway corriendo en http://localhost:${PORT}`);
});