const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.static('public'));

// take any json data that comes along with request and parse it into js object => we can use inside code
app.use(express.json())


// set view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( (result) => {
    // connect db => listen
    app.listen(port, () => console.log(`Server is running at port ${port}`));
})
.catch(err => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoute); 
