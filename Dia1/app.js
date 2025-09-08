
const express= require('express');
const app=express();


app.use(express.json());

require('dotenv').config();

const PORT=process.env.PORT;


app.get('/',(req,res)=>{
    res.send('haloooooooooooo get general')
}
);

app.get('/mensaje1',(req,res)=>{
    res.send('haloooooooooooo get mensaje 1')
}
);

app.post('/mensaje1',(req,res)=>{
    res.send('helloooooooo post mensaje 1')
}
);

app.get('/mensaje2',(req,res)=>{
    perros= {"mensaje":"good morning get mensaje 2"}
    res.json(
       perros
    )
}
);


app.get('/mensajePersonalizado/:nombre',(req,res)=>{
    const nombre=req.params.nombre;
    res.send(`haloooooooooooo ${nombre}`)
}
);




 

app.post('/mensajeJSON',(req,res)=>{
    const menJson=req.body;
    res.json(`hola ${menJson["nombre"]}, el cual tiene ${menJson["edad"]} año/s`)
})


app.listen(PORT,()=>{
    console.log("server iniciado");
}
);

// requerir mongodb