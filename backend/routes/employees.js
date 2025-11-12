const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Admin only
router.get('/', authMiddleware, roleMiddleware(['admin']), employeeController.getAllEmployees);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), employeeController.getEmployeeById);
router.post('/', authMiddleware, roleMiddleware(['admin']), employeeController.createEmployee);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), employeeController.updateEmployee);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), employeeController.deleteEmployee);

module.exports = router;
