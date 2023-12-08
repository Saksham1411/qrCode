const express = require('express');
const { addStudent,verifyStudent,resetAllowed } = require('../controllers/student');

const router = express.Router();

router.post('/register',addStudent);
router.post('/verify',verifyStudent);
router.patch('/reset',resetAllowed);


module.exports = router;