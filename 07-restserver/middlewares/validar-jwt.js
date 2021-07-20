const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const valdiarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')
    
    if(!token){
        return res.status(401).json ({
            msg: "no hay token en la petición"
        })
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const usrAutenticated = await Usuario.findById(uid)
        
        if(!usrAutenticated){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        //verificar si uid tiene estado true
        if(!usrAutenticated.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario estado false'
            })
        }      
        
        //req.uid = uid
        req.usrAutenticated = usrAutenticated

        next();

    }catch(error){
        console.log(error)
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}

module.exports = {
    valdiarJWT
}