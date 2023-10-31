const express = require('express');
const { session } = require('passport');
const router = express.Router();


router.get('/homePage',async (req,res) => {
    
    const dataToSend = {
        username: req.session.username,
        email: req.session.email,
        password: req.session.password 
    };
    res.render('HomePage',{data:dataToSend});
    
});


module.exports = router;