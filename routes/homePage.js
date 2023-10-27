const express = require('express');
const router = express.Router();

router.get('/homePage', (req,res) => res.send('hiasdasd'));
router.post('/homePage', (req,res) => {
    //const email = req.body.email;
   // const password = req.body.password;
    //const username =req.body.username;

    res.render('HomePage');

});


module.exports = router;