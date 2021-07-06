const { response } = require ('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')


const usuariosGet = async(req, res) => {

   // const {q, nombre = "no name", apikey} = req.query
    const {limite = 5, desde = 0} = req.query;
    const queryActivos = { estado: true}

    //ejecutando consultas simultaneas. no esperar respuestas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(queryActivos),
        Usuario.find(queryActivos)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    // res.status(403).json({
     res.json({
        total, usuarios
     })
 }

 const usuariosPut = async(req, res) => {

    const id = req.params.id

    //evitando que editen propiedades automáticas
    const {_id,password, google, correo,...resto} = req.body;

    //TODO validar contra bdd
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);    
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

     res.json( usuario)
 }

 const usuariosPost = async(req, res) => {
   
    const {nombre,correo, password, rol} = req.body;
    //const body = req.body;
    const usuario = new Usuario({nombre,correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar en BD

    await usuario.save()

    // res.status(403).json({
     res.json({
         //msg: 'post API',
         //nombre, edad
         usuario
     })
 }

 const usuariosDelete =  async(req, res) => {
    // res.status(403).json({

     const {id} = req.params

     const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
        //borrado físico
        //await Usuario.findByIdAndDelete(id)

     res.json({
         usuario
     })
 }

 const usuariosPatch = (req, res) => {
    // res.status(403).json({
     res.json({
         msg: 'patch API'
     })
 }

 module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
 }