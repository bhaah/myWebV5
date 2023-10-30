const express = require('express');
const router = express.Router();



router.get('/', (req,res) => {
    res.render('login');
    
})
router.post('/re',(req,res)=>{
    const data = {
        name : 'dsaasd'
    };
    console.log('asd');
    res.render('register');
})

module.exports = router;