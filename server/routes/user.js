const express = require('express');
const router = express.Router();
const {handleCreateNewUser , handleLoginUser} = require("../controllers/authentication");

// /signin → POST
router.post('/signin', handleCreateNewUser);

// /login → POST
router.post('/login', handleLoginUser);

module.exports = router;
