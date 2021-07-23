const {response} = require ('express')
const { isValidObjectId } = require('mongoose')
const {Usuario, Categoria,Producto } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'producto',
    'roles'
]


const buscarProductos = async(termino = '', res=response) => {
    const esMongoID = isValidObjectId(termino)

    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre')
        return res.json({
            results: (producto ? [producto] : [])
        })
    }

    //que no considere mayusculas o minúsculas
    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({        
        $and: [{nombre:regex},{estado:true}]
    }).populate('categoria','nombre')
    return res.json({
        results: productos
    })

}
const buscarCategorias = async(termino = '', res=response) => {
    const esMongoID = isValidObjectId(termino)

    if(esMongoID){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    //que no considere mayusculas o minúsculas
    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({        
        $and: [{nombre:regex},{estado:true}]
    })
    return res.json({
        results: categorias
    })

}

const buscarUsuarios = async(termino = '', res=response) => {
    const esMongoID = isValidObjectId(termino)

    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    //que no considere mayusculas o minúsculas
    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{nombre:regex},{correo:regex}],
        $and: [{estado:true}]
    })
    return res.json({
        results: usuarios
    })

}

const buscar = (req, res =response) => {
    
    const {coleccion, termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`            
        })    
    }

    switch(coleccion){
        case 'usuarios' :
            return buscarUsuarios(termino, res)
            break;
        case 'categoria':
            return buscarCategorias(termino, res)
            break;            
        case 'producto' :
            return buscarProductos(termino, res)
            break;
        case 'roles':
            break;    
        default: 
            res.status(500).json({
                msg:`falta búsqueda ${key}`
            })    
            break;
    }    
}

module.exports = {
    buscar
}