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
    req.session.save();
    
    console.log(req.session.email);
    console.log(store);
    res.redirect('/user/homepage')
    console.log('.....................');

});

app.get('/getlogedinuser',(req,res)=>{
    console.log('hi from app get');
    console.log(req.session.email);
    
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
app.use('/',require('./routes/index'));
app.use('/register',require('./routes/register'));
app.use('/users',require('./routes/users'));

app.use('/user',require('./routes/homePage'));


const PORT = process.env.PORT || 5000;


app.listen(PORT , console.log(`server started on port ${PORT}`))