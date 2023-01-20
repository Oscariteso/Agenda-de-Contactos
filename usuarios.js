const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
const modelo = require('./../models/usuario');
const crypto = require('crypto');

function hashPassword(pwd){
    return crypto.scryptSync(pwd, 'salt', 24);
}
//require('dotenv').config(); no me sirve

module.exports = {
    login: (req, res) => {
        const data = req.body;

        const credenciales = {
            correo: data.correo,
            password: hashPassword(data.password)
        }
        
        modelo.findOne(credenciales).then(response => {
            if(response) {
                console.log(response);
                const {_id, nombre, correo } = response;
                const token = jwt.sign({_id, nombre, correo}, process.env.SECRET); 
                res.send({token, nombre, correo});
            } else {
                res.sendStatus(401);
            }
        }).catch(err => {
            res.sendStatus(400);
        });
            
    },
    registro: (req, res) => {
        const datos = req.body;
        const hashedPassword = hashPassword(datos.password);
        datos.password = hashedPassword;
        modelo.create(datos).then(response =>{
            delete response.password;
            res.send(response);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
    
}

