const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Admin only
router.get('/', authMiddleware, roleMiddleware(['admin']), salaryController.getAllSalaries);
router.get('/:userId', authMiddleware, roleMiddleware(['admin', 'employee']), salaryController.getSalaryByUser);
router.post('/', authMiddleware, roleMiddleware(['admin']), salaryController.createOrUpdateSalary);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), salaryController.deleteSalary);

module.exports = router;
