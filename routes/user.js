const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPatch, usuariosDelete, usuariosPut } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/',usuariosGet );

router.post('/',[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de contener mas de 6 caracteres").isLength(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom( esRoleValido),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos
] , usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(), 
    check("id").custom( existeUsuarioPorId ),
    check("rol").custom( esRoleValido ), 
    validarCampos
], usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(), 
    check("id").custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );


module.exports = router;