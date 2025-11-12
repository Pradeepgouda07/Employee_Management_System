const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Everyone can view departments
router.get('/', authMiddleware, departmentController.getAllDepartments);
router.get('/:id', authMiddleware, departmentController.getDepartmentById);

// Admin only
router.post('/', authMiddleware, roleMiddleware(['admin']), departmentController.createDepartment);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), departmentController.updateDepartment);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), departmentController.deleteDepartment);

module.exports = router;
