const express = require('express');
const { session } = require('passport');
const router = express.Router();



router.get('/', (req,res) => {
    if(req.session.email && req.session.password){
        res.redirect('./user/homepage');
    }
    else{
        res.render('login');
    }
    
    
})
router.get('/register',(req,res)=>{
    const data = {
        name : 'dsaasd'
    };
    console.log('asd');
    console.log(session);
    res.render('register');
})

module.exports = router;