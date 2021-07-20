const validaCampos  = require ('../middlewares/validar-campos')
const valdiaJWT     = require('../middlewares/validar-jwt')
const validaRoles   = require('../middlewares/validar-roles')

module.exports = {
    ...validaCampos,
    ...valdiaJWT   ,
    ...validaRoles ,
}
