const express = require('express');
const router = express.Router();
const { handleCreateNewUser, handleLoginUser } = require('../controllers/userController');

router.post('/register', handleCreateNewUser);
router.post('/login', handleLoginUser);

module.exports = router;
