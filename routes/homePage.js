const express = require('express');
const router = express.Router();


router.get('/homePage',async (req,res) => {
    const absoluteUrl = req.protocol + '://' + req.get('host') + '/getlogedinuser';
    const data = await fetch(absoluteUrl,{
        method : 'GET',
        
    }).then(response => {
        console.log(response);
        return response.json();
    }).catch(error => console.log(error));
    console.log(data);
    const dataToSend = {
        key1: 'value1',
        key2: 'value2'
    };
    res.render('HomePage',{data:dataToSend});
    
});


module.exports = router;