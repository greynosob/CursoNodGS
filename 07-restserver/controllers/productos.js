const {response} = require('express')
const {Producto, Categoria} = require('../models')
const mongoose = require('mongoose')

// obtenerCateogrias - paginado - total - populate (último usuario)
const obtenerProductos = async(req, res = response) => {    
    const {limite = 5, desde = 0} = req.query;
    const queryActivos = { estado: true}

    //ejecutando consultas simultaneas. no esperar respuestas
    const [total, productos] = await Promise.all([
        Producto.countDocuments(queryActivos),
        Producto.find(queryActivos)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    // res.status(403).json({
     res.json({
        total, productos
     })
}
// obtenerProducto - populate
const obtenerProducto = async(req, res = response) => {
    const {id} = req.params
    
    const producto = await Producto.findById(id).populate('usuario','nombre')
    
    res.json({
        producto//, uid,usrAutenticated
    })
}

// actualizarProducto - nombre
const actualizarProducto = async(req, res = response) => {

    try{
        const id = req.params.id

        //evitando que editen propiedades automáticas
        const {_id,estado,usuario, ...resto} = req.body;

        if(resto.nombre){
            resto.nombre = resto.nombre.toUpperCase()
        }
        
        resto.usuario = req.usrAutenticated._id //actualizar usuario que modificó

        if(resto.categoria){            
            try{
            var myId = mongoose.Types.ObjectId(resto.categoria)
            }catch(error){
                console.log(error)
                return res.status(201).json({
                    msg: `La categoria ${resto.categoria} no existe`
                })
            }            

            const categoria = await Categoria.findById(myId)
            console.log(categoria)
            if(!categoria || !categoria.estado ){
                return res.status(201).json({
                    msg: `La categoria ${resto.categoria} no existe`
                })
            }
        }
        const producto = await Producto.findByIdAndUpdate(id, resto
            , {new:true});//que devuelva los valores con el valor nuevo
    
         res.json( producto)

    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'error'
        })
    }
}

// borrarProducto - estado : false
const borrarProducto = async(req, res = response) => {
    
    const {id} = req.params
    
    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})
    
    res.status(200).json(
        producto//, uid,usrAutenticated
    )
}


const crearProducto = async(req, res = response) => {
    
    const {estado, usuario, ...body} = req.body

    const nombre = body.nombre.toUpperCase()    
    const productoDB = await Producto.findOne({nombre})

    if(productoDB){
        return res.status(400).json({
            msg:`El Producto ${productoDB.nombre}, ya existe`
        })
    }
    //console.log(req)
    const data = {
        ...body,
        usuario: req.usrAutenticated._id        
    }

    const producto = new Producto(data)
    await producto.save()

    res.status(201).json(producto)
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
}