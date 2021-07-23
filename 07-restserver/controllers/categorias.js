const {response} = require('express')
const {Categoria} = require('../models')

// obtenerCateogrias - paginado - total - populate (último usuario)
const obtenerCategorias = async(req, res = response) => {    
    const {limite = 5, desde = 0} = req.query;
    const queryActivos = { estado: true}

    //ejecutando consultas simultaneas. no esperar respuestas
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(queryActivos),
        Categoria.find(queryActivos)
            .populate('usuario','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    // res.status(403).json({
     res.json({
        total, categorias
     })
}
// obtenerCategoria - populate
const obtenerCategoria = async(req, res = response) => {
    const {id} = req.params
    
    const categoria = await Categoria.findById(id).populate('usuario','nombre')
    
    res.json({
        categoria//, uid,usrAutenticated
    })
}

// actualizarCategoria - nombre
const actualizarCategoria = async(req, res = response) => {
    const id = req.params.id

    //evitando que editen propiedades automáticas
    const {_id,estado,usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase()
    resto.usuario = req.usrAutenticated._id //actualizar usuario que modificó

    const categoria = await Categoria.findByIdAndUpdate(id, resto
        , {new:true});//que devuelva los valores con el valor nuevo

     res.json( categoria)
}

// borrarCategoria - estado : false
const borrarCategoria = async(req, res = response) => {
    
    const {id} = req.params
    
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})
    
    res.status(200).json(
        categoria//, uid,usrAutenticated
    )
}


const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    //console.log(req)
    const data = {
        nombre,
        usuario: req.usrAutenticated._id
    }

    const categoria = new Categoria(data)
    await categoria.save()

    res.status(201).json(categoria)
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}