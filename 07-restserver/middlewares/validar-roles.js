const { response } = require("express")

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usrAutenticated){
            return res.status(500).json({
                msg:'se quiere verificar el rol sin validar el token primero'
            })
        }

        if(!roles.includes(req.usrAutenticated.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}

const esAdminRole = (req, res = response, next) => {
    if(!req.usrAutenticated){
        return res.status(500).json({
            msg:'se quiere verificar el rol sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usrAutenticated

    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${ nombre } no es administrador - no puede hacer esto`
        })
    }

    next();
}

module.exports = {
    esAdminRole,
    tieneRole
}