const express = require('express');
const router = express.Router();

router.get('/home', (req,res) => {
    res.render('register');
    
    console.log('dasdasdasdasd');
}
    );


module.exports = router;