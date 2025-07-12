const express = require("express");

const handleCreateSession = require('../controllers/sessioncontroller');
const { authenticateToken }= require('../middleware/auth');
const router = express.Router();


// console.log('✅ Imported handleCreateSession:', handleCreateSession);
router.post('/create-link', authenticateToken, handleCreateSession);

module.exports = router;
