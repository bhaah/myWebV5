const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');



app.use('/',require('./routes/index'))

app.use('/users',require('./routes/users'))




const PORT = process.env.PORT || 5000;


app.listen(PORT , console.log(`server started on port ${PORT}`))