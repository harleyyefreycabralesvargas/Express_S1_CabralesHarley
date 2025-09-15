import express  from "express";
const app = express();
const port = 3000; // Puedes usar cualquier puerto

// Middleware para servir archivos estáticos
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});   