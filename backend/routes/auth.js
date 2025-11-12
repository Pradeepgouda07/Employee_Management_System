// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const roleMiddleware = require('../middlewares/roleMiddleware');

// // Admin can register users
// router.post('/register', authMiddleware, roleMiddleware(['admin']), authController.register);

// // Login
// router.post('/login', authController.login);

// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public signup for normal users
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

// Admin-only route to create other admins (optional)
router.post(
  '/create-admin',
  authMiddleware,
  roleMiddleware(['admin']),
  authController.createAdmin
);

module.exports = router;
