const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/usersController');

// Routes for user registration and authentication
router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;