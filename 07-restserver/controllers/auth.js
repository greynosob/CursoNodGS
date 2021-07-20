const {response} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const {googleVerify} = require ('../helpers/google-verify')
const {generarJWT} = require ('../helpers/generarJWT')

const login = async(req, res=response) => {
    
    const {correo, password} = req.body
    try{
       //verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        console.log('usuario', usuario)
        if(!usuario){            
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }

        //el usaurio está activo
        if(!usuario.estado){            
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            })
        }
        
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password) 
        if(!validPassword){            
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            })
        }

        //generar jwt
        const token = await generarJWT(usuario.id)

        res.json ({
            msg:'Login ok'
            ,usuario,token
        })
    }catch (error){
        console.log(error)
        return res.status(500).json ({
            msg:'Hable con el administrador'            
        })
    }   
}

const googleSignin = async(req, res = response) =>{
    const {id_token} = req.body
    
    try{
        const {correo, nombre, img} = await googleVerify(id_token)
        //console.log('googleUser',googleUser)
        let usuario = await Usuario.findOne({correo})

        if(!usuario){
            //crearlo
            const data = {
                nombre,
                correo,
                password: 'default',
                img,
                goolge:true,               
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con administrador usuario bloqueado'
            })
        }
        
        const token = generarJWT(usuario.id)

        res.json({
          usuario,
          token
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Token de google no valido'
        })
    }
}

module.exports = {
    login,
    googleSignin
}