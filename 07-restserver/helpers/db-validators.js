const Role = require('../models/role')
const Usuario = require('../models/usuario')
const mongoose = require('mongoose')

const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne ({ rol });
    if(!existeRol){
        throw new Error (`El rol ${rol} no está registrado en la db`)
    }
}

const emailExiste = async (correo ='') => {
    const existeEmail = await Usuario.findOne({ correo });    
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado`)
    }
}

const ExisteUsuarioId = async (id) => {    
    var myId = new mongoose.Types.ObjectId(id)
    console.log(`id ${id} myid ${myId}`)    
    const existeId = await Usuario.findById ({ myId });    
    console.log(`existeId ${existeId}`)
    if(!existeId){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    ExisteUsuarioId
}

