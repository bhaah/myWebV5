const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const store = new session.MemoryStore();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'mysecret', // Change this to a unique secret
    resave: false,
    saveUninitialized: true,
    store : store,
    
    
}));

app.post('/savelogin',(req,res)=>{
    console.log('.....................');
    console.log(req.sessionID);
    console.log(req.body);
    req.session.email = req.body.email;
    req.session.password=req.body.password;
    req.session.username=req.body.username;
    req.session.coins = req.body.coins;
    req.session.currAvatar = req.body.currAvatar;
    req.session.ownedAvatars = req.body.ownedAvatars;
    req.session.save();
    
    console.log(req.session.email);
    console.log(store);
    res.redirect('./user/homepage')
    console.log('.....................');

});

app.post('/sessionid',(req,res)=>{
    console.log('-------------------------------');
    console.log(req.sessionID);
    console.log('dddddddddddddddddddd');
    console.log(session.Cookie);
    console.log('dddddddddddddddddddd');
    console.log(session);
    console.log('-------------------------------');

});


app.post('/userAvatar',(req,res)=>{
    console.log(req.sessionID);
    const dataToSend = {
        currAvatar : req.session.currAvatar,
        coins : req.session.coins,
        ownedAvatars : req.session.ownedAvatars
    }
    const jsonData = JSON.stringify(dataToSend);
    res.send(jsonData);
})

app.post('/getlogedinuser',(req,res)=>{
    console.log('hi from app get');
    console.log(req.sessionID);
    
    console.log(store);
    const value = req.cookies;
    console.log(value['connect.sid']);
    const obj1=value.json;
    console.log(obj1);
    const data = {
        email: req.session.email,
        password : req.session.password,
        username : req.session.username,
    }
    console.log(data);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    res.send(jsonData);
});

app.post('/getRandomMessage',async (req,res)=>{
    console.log(req.sessionID);
    const dataToSend = new FormData();
    dataToSend.append('email',req.session.email);
    dataToSend.append('password',req.session.password);
    //const json = JSON.stringify()
    const dataRec= await fetch('https://api-backend-of-my-app.onrender.com/api/Home/getRandomMessage',{
        method:'POST',
        body : dataToSend,
        
    }).then(response=>{
        console.log(response);
        return response.json();
    }).then(result=>{
        console.log(result);
        const content = result.ReturnValue.Content;
        const data = {
            Content : content,
        }
    
        const jsonToRet = JSON.stringify(data);
    
        res.send(jsonToRet);
    }).catch(error=>console.log(error));
    console.log(dataRec);
    
    
})

app.post('/updateProfile', (req,res)=>{
    console.log('hi from post update profile');
    const type = req.body.type;
    switch(type){
        case 'currAvatar':
            req.session.currAvatar = req.body.currAvatar;
            break;
        default :
            break;
    }
    req.session.save();
    console.log('bi from post update profile');
    
})


app.use('/',require('./routes/index'));
app.use('/register',require('./routes/register'));
app.use('/users',require('./routes/users'));

app.use('/user',require('./routes/homePage'));


const PORT = process.env.PORT || 5000;


app.listen(PORT , console.log(`server started on port ${PORT}`))