const jwt = require("jsonwebtoken");

function checkAuth(cookieName){
    return (req,res,next)=>{
        const tokenVal = req.cookies.token;
        if(!tokenVal) return next();
        try{
            const payload = jwt.verify(tokenVal,process.env.JWT_SECRET);
            req.user = {...payload};
            next();
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = checkAuth;