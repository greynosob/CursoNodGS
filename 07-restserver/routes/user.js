const {Router} = require('express')
const {check} = require('express-validator')

const {validarCampos,valdiarJWT,esAdminRole, tieneRole} = require('../middlewares')

const {esRoleValido,emailExiste,ExisteUsuarioId} = require ('../helpers/db-validators')
const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch} = require('../controllers/user')


const router = Router();

router.get('/', usuariosGet)

router.post('/',[ //acá van los middlewares de validación
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y con mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),   
   // check('rol','No es un rol permitido').not().isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('rol').custom(esRoleValido),   
    validarCampos
],usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/:id',[
  valdiarJWT,
 // esAdminRole,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(ExisteUsuarioId),  
  validarCampos
]
, usuariosDelete)

router.put('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
//  check('id').custom(ExisteUsuarioId),
  check('rol').custom(esRoleValido),
  validarCampos
]
, usuariosPut)


module.exports = router