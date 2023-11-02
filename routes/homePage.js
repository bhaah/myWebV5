const express = require('express');
const { session } = require('passport');
const router = express.Router();


router.get('/homePage',(req,res) => {
    
    const dataToSend = {
        username: req.session.username,
        email: req.session.email,
        password: req.session.password 
    };
    console.log(dataToSend);
    console.log(req.sessionID);
    if(dataToSend.email && dataToSend.password)
        res.render('HomePage',{data:dataToSend});
    else{
        res.redirect('../');
    }
});
router.get('/logout',(req,res)=>{
    req.session.destroy();
   
})

module.exports = router;