const express = require('express');
const router = express.Router();

function login(){
    console.log('hii');
}


router.get('/', (req,res) => res.render('login'));


module.exports = router;