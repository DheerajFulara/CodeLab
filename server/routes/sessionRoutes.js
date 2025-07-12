const express = require('express');
const router = express.Router();
const { createSession, getSessionByCode } = require('../controllers/sessioncontroller');

router.post('/create', createSession);
router.get('/:code', getSessionByCode);

module.exports = router;
