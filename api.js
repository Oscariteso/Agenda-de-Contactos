// GET /contactos
const { application } = require('express');
const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth');
const router = require('express').Router();
const contactosController = require('./../controllers/contactos');
const usuariosController = require('./../controllers/usuarios');

const storage = {
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        let nombre = req.user._id + new Date().getTime() + '.' + extension;
        callback(null, nombre);
    }
};
const multerStorage = multer.diskStorage(storage);
const upload = multer({storage: multerStorage});

// CONTACTOS
router.use('/contactos', authMiddleware);

router.get('/contactos', contactosController.listar);
router.get('/contactos/correo', contactosController.Consultarcorreo);
router.get('/contactos/nombre', contactosController.Consultarnombre);
router.post('/contactos', upload.single('foto'), contactosController.crear);
router.put('/contactos/:id', contactosController.editar);
router.get('/contactos/:id', contactosController.ver);
router.delete('/contactos/:id', contactosController.eliminar);



// USUARIOS
router.post('/registro', usuariosController.registro);
router.post('/login', usuariosController.login);


module.exports = router;

