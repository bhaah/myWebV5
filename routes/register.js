const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('register')
    console.log('dasdasdasdasd');
}
    );


module.exports = router;