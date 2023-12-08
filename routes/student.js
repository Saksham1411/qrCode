const express = require('express');
const { addStudent,verifyStudent } = require('../controllers/student');

const router = express.Router();

router.post('/register',addStudent);
router.post('/verify',verifyStudent);


module.exports = router;