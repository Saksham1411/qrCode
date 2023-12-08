const express = require('express');

const router = express.Router();

router.get('/scanner',(req,res)=>{
    res.render("Scanner");
})

router.get('/register',(req,res)=>{
    res.render("register");
})


module.exports = router;