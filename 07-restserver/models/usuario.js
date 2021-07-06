const {Schema, model} = require('mongoose')

//Estructura
//{nombre:'', correo:'algo@Server.com', password:'encriptado', img:'ruta',rol:'el rol', estado:false, goolge: false}

const UsuarioSchema = Schema ({
    nombre: {
        type:String,
        required: [true, 'nombre es obligatorio']
    }, 
    correo:{
        type:String,
        required: [true, 'correo es obligatorio'],
        unique:true
    },  
    password:{
        type:String,
        required: [true, 'contraseña es obligatoria']
    },  
    img:{
        type:String,       
    }, 
    rol:{
        type:String,
        required: true, 
        //enum: ['ADMIN_ROLE','USER_ROLE']

    }, 
    estado:{ //borrado lógico
        type: Boolean,
        default:false
    }, goolge: {
        type: Boolean,
        default:false
    }
})

UsuarioSchema.methods.toJSON = function (){
    //todos menos la versión y el password
    const {__v,password, ...usuario} = this.toObject();
    return usuario
}

module.exports = model( 'Usuario' , UsuarioSchema)