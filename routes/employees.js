const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');


// Rutas para obtener todos los registros de DATES
router.get('/', employeesController.getAll);

// Ruta para obtener un registro de DATES por ID
router.get('/:id', employeesController.getSingle);

// Ruta para crear un nuevo registro en DATES
router.post('/', validation.validateEmployee,employeesController.createDate); // Asegúrate de que esté definido como createDate

// Ruta para actualizar un registro en DATES por ID
router.put('/:id', validation.validateEmployee,employeesController.updateDate);

// Ruta para eliminar un registro de DATES por ID
router.delete('/:id', employeesController.deleteDate);

module.exports = router;