const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Employee routes
router.get('/my', authMiddleware, roleMiddleware(['employee']), leaveController.getMyLeaves);
router.post('/apply', authMiddleware, roleMiddleware(['employee']), leaveController.applyLeave);

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['admin']), leaveController.getAllLeaves);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), leaveController.updateLeaveStatus);

module.exports = router;
