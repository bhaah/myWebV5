const express = require('express');
const { session } = require('passport');
const router = express.Router();


router.get('/homePage',(req,res) => {
    
    const dataToSend = {
        username: req.session.username,
        email: req.session.email,
        password: req.session.password, 
        coins: req.session.coins,
        currAvatar: req.session.currAvatar
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


router.get('/boards',(req,res) => {
    
    const dataToSend = {
        username: req.session.username,
        email: req.session.email,
        password: req.session.password, 
        coins: req.session.coins,
        currAvatar: req.session.currAvatar
    };
    console.log(dataToSend);
    console.log(req.sessionID);
    if(dataToSend.email && dataToSend.password)
        res.render('Boards',{data:dataToSend});
    else{
        res.redirect('../');
    }
});

router.get('/board',(req,res) => {
    const dataToSend = {
        username: req.session.username,
        email: req.session.email,
        password: req.session.password, 
        corners: req.session.corners,
        currAvatar: req.session.currAvatar
    };
   
    
    if(dataToSend.email && dataToSend.password)
        res.render('Board',{data:dataToSend});
    else{
        res.redirect('../');
    }
});

router.get('/calendar',(req,res)=>{
    const dataToSend = {
        
        email: req.session.email,
        password: req.session.password, 
        
    };
    if(dataToSend.email && dataToSend.password)
        res.render('Calendar');
    else{
        res.redirect('../');
    }
})


module.exports = router;