const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
const contacto = require('./../models/contacto');


module.exports = {
    listar: (req, res) => {
        contacto.find({status: 1, userId: req.user._id})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send('algo salio mal'); //BAD REQUEST
            });
    },

    ver: (req, res) =>{
        const id = req.params.id;
        contacto.findOne({status: 1, _id: id, userId: req.user._id})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send('algo salio mal ver id'); //BAD REQUEST
            });
    },

    Consultarnombre: (req, res) =>{
        const nombre = req.query.nombre;
        console.log(req.query)
        contacto.find({nombre: nombre})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('algo salio mal en consultar nombre'); //BAD REQUEST
            }); 
    },

    Consultarcorreo: (req, res) =>{
        const correo = req.query.correo;
        console.log(req.query)
        contacto.find({correo: correo})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log(err)
                res.status(400).send('algo salio mal en consultar nombre'); //BAD REQUEST
            }); 
    },

    crear: (req,res) => {
        const data = req.body;
        
        data.userId = req.user._id;
        console.log(req.file);
        contacto.create(data).then(response =>{
            res.send(response);
        }).catch(e =>{
            res.sendStatus(400);
        });

    },

    editar: (req,res) => {
        const data = req.body;
        const id = (req.params.id);
        contacto.findOneAndUpdate({_id: id, userId: req.user._id }, data, {new: true})
        .then(data  =>{
            res.send({usurioeditado: data, message: "usuario editado"})

        })
    },


    eliminar: (req,res) => {
        const data = req.body;
        const id = (req.params.id);
        console.log(data)
        contacto.findOneAndUpdate({_id: id, userId: req.user._id }, {status: 2}, {new: true}).then(data  =>{
            res.send({usurio_eliminado: data, message: "usuario eliminado"})

        })
    }


}

//find findOne findById create save consultar name, consultar con el correo, delete logico(edit), post 