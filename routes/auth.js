const express = require('express');
const router = express.Router();
const { register,logIn } = require('../controllers/auth');
// console.log("hihi");
router.post('/signIn', register);
router.post('/logIn', logIn);

module.exports = router;