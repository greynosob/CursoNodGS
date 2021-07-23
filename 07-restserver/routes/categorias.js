const {Router} = require('express')
const {check} = require('express-validator')

const { valdiarJWT,validarCampos, tieneRole } = require('../middlewares');
const {crearCategoria,obtenerCategorias,obtenerCategoria,actualizarCategoria,borrarCategoria} = require('../controllers/categorias')
const {ExisteCategoriaId} = require('../helpers/db-validators')

const router = Router();

// obtener todas las categorías - público
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ExisteCategoriaId),  
    validarCampos]
    , obtenerCategoria
)

// obtener una categorías - público
router.get('/', obtenerCategorias)

// crear una categorías - privado - con tocken válido
router.post('/', [valdiarJWT
  //  ,tieneRole('ADMIN_ROLE','VENTAS_ROLE')
    , check('nombre','El nombre es obligatorio').not().isEmpty()
    , validarCampos
], crearCategoria)

// actualizar una categorías - privado - con tocken válido
router.put('/:id',[valdiarJWT,
  //  ,tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ExisteCategoriaId),  
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos]
, actualizarCategoria)

// actualizar una categorías - privado - con tocken válido y admin
router.delete('/:id',[
    valdiarJWT
    ,tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(ExisteCategoriaId),  
    validarCampos]
    ,borrarCategoria
)



module.exports = router;
