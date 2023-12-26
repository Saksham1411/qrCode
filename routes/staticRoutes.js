const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    // console.log(req.user);
    res.render("home",{
        user:req.user,
    });
})

router.get('/scanner',(req,res)=>{
    res.render("Scanner");
})

router.get('/register',(req,res)=>{
    res.render("register");
})
router.get('/signIn',(req,res)=>{
    res.render("signin");
})
router.get('/logIn',(req,res)=>{
    res.render("login");
})
router.get('/logOut',(req,res)=>{
    res.clearCookie('token').redirect('/login');
})


module.exports = router;