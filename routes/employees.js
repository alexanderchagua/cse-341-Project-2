const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
//const auth = require('../middleware/authentication.js');
//const validation = require('../middleware/validate');
const{isAuthenticated} = require('../middleware/authenticate');


router.get('/', employeesController.getAll);


router.get('/:id', employeesController.getSingle);
router.post('/', isAuthenticated, employeesController.createDate);
router.put('/:id', isAuthenticated, employeesController.updateDate);
router.delete('/:id', isAuthenticated, employeesController.deleteDate);

//router.post('/', validation.validateEmployee,employeesController.createDate); 


//router.put('/:id', validation.validateEmployee,employeesController.updateDate);


//router.delete('/:id', employeesController.deleteDate);

module.exports = router;
