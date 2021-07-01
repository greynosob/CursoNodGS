const { response } = require ('express')

const usuariosGet = (req, res) => {

    const {q, nombre = "no name", apikey} = req.query

    // res.status(403).json({
     res.json({
         msg: 'get API - controlador',
         q, nombre, apikey
     })
 }

 const usuariosPut = (req, res) => {

    const id = req.params.id

    // res.status(403).json({
     res.json({
         msg: 'put API',
         id
     })
 }

 const usuariosPost = (req, res) => {
    
    const {nombre,edad} = req.body;
    
    // res.status(403).json({
     res.json({
         msg: 'post API',
         nombre, edad
     })
 }


 const usuariosDelete =  (req, res) => {
    // res.status(403).json({
     res.json({
         msg: 'delete API'
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