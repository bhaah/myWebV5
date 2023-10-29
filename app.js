const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');



app.use('/',require('./routes/index'));
app.use('/register',require('./routes/register'));
app.use('/users',require('./routes/users'));

app.use('/user',require('./routes/homePage'));


const PORT = process.env.PORT || 5000;


app.listen(PORT , console.log(`server started on port ${PORT}`))