const mongoose = require('./db/db');
const express = require('express');
const path = require("path");
const app = express();
session = require('express-session')

app.set('view engine', 'hbs');
var hbs = require('hbs');
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended:false}));

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));


hbs.registerPartials(path.join(__dirname + '/views/partials/'));
app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname ,'/uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

//route for the home page
app.get('/', (req, res) => {
  res.render('home')
})

const authRoute = require("./routes/auth")
app.use(authRoute);

const adminRoute = require('./routes/admin')
app.use(adminRoute);

const staffRoute = require('./routes/staff')
app.use(staffRoute);

const trainerRoute = require('./routes/trainer')
app.use(trainerRoute);

const traineeRoute = require('./routes/trainee')
app.use(traineeRoute)



// Port
const port = process.env.PORT||5000;
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`)
})

