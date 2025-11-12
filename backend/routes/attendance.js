const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Employee routes
router.get('/my', authMiddleware, roleMiddleware(['employee']), attendanceController.getMyAttendance);
router.post('/mark', authMiddleware, roleMiddleware(['employee']), attendanceController.markAttendance);

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['admin']), attendanceController.getAllAttendance);

module.exports = router;
