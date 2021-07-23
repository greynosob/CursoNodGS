const {Router} = require('express')
const {check} = require('express-validator')

const { valdiarJWT,validarCampos, tieneRole } = require('../middlewares');
const {crearProducto,obtenerProductos,obtenerProducto,actualizarProducto,borrarProducto} = require('../controllers/productos')
const {ExisteProductoId,ExisteCategoriaId} = require('../helpers/db-validators')

const router = Router();

// obtener todas las categorías - público
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ExisteProductoId),  
    validarCampos]
    , obtenerProducto
)

// obtener una categorías - público
router.get('/', obtenerProductos)

// crear una categorías - privado - con tocken válido
router.post('/', [valdiarJWT
  //  ,tieneRole('ADMIN_ROLE','VENTAS_ROLE')
    , check('nombre','El nombre es obligatorio').not().isEmpty()
    , check('precio','El precio es obligatorio').not().isEmpty()
    , check('descripcion','La descripcióm es obligatoria').not().isEmpty()
    ,check('categoria', 'No es un ID valido').isMongoId()
    ,check('categoria').custom(ExisteCategoriaId)
    ,validarCampos
], crearProducto)

// actualizar una categorías - privado - con tocken válido
router.put('/:id',[valdiarJWT,
  //  ,tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ExisteProductoId),  
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('disponibilidad','La disponibilidad es obligatoria').not().isEmpty(),
    validarCampos]
, actualizarProducto)

// actualizar una categorías - privado - con tocken válido y admin
router.delete('/:id',[
    valdiarJWT
    ,tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ExisteProductoId),  
    validarCampos]
    ,borrarProducto
)


module.exports = router;
