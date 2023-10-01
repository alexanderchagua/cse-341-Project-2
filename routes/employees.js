const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');



router.get('/', employeesController.getAll);


router.get('/:id', employeesController.getSingle);


router.post('/', validation.validateEmployee,employeesController.createDate); // Asegúrate de que esté definido como createDate


router.put('/:id', validation.validateEmployee,employeesController.updateDate);


router.delete('/:id', employeesController.deleteDate);

module.exports = router;
