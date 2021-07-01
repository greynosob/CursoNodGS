const express = require('express')
var cors = require('cors')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        //middlewares
        this.middlewares()

        //rutas de mi app
        this.routes()
    }

    middlewares(){
        this.app.use(express.static('public'))
        this.app.use(cors())
        //pareceo y lectura
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){  
        this.app.listen(this.port, () =>{
            console.log(`Lisenig at http://localhost:${this.port}`)
        })
    }
 }

module.exports = Server;