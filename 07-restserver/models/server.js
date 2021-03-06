const express = require('express')
const cors = require('cors')

const {dbConnection} = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth:      '/api/auth' ,
            buscar:    '/api/buscar' ,
            categorias:'/api/categorias' ,
            usuarios:  '/api/usuaros' ,
            productos:  '/api/productos' 
        }

        //this.usuariosPath = '/api/usuarios'
        //this.authPath = '/api/auth'
        
        //conectar a base de datos
        this.conectarDB()

        //middlewares
        this.middlewares()

        //rutas de mi app
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.static('public'))
        this.app.use(cors())
        //pareceo y lectura
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
    }

    listen(){  
        this.app.listen(this.port, () =>{
            console.log(`Lisenig at http://localhost:${this.port}`)
        })
    }
 }

module.exports = Server;