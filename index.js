const express = require('express');
const mongoose = require('mongoose');

const apiRoutes = require('./src/routes/api');

const app = express();

app.use(express.json());
require('dotenv').config(); //lo movi de abajo
const port = process.env.PORT || 3000;

app.use(apiRoutes);

app.get('', (req, res) =>{
    res.send('api works');
});


// estaba aqui arriba
const uri = process.env.MONGODB;
mongoose.connect(uri, (err) => {
    if(err){
        console.log('No se pudo conectar a la base de datos');
    } else {
        console.log('Se conecto correctamente a la base de datos');
        app.listen(port, () => {
            console.log('app is running in port ' + port);
        });
    }
});

