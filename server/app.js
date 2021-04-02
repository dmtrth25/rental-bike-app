const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bikesRouter = require('./routes/bikes');

const app = express();

const connectionString = 'mongodb+srv://dmytro:1q2w3e4r5t@cluster0.g7fcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(connectionString,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  });

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Methods', "GET, DELETE, POST, PATCH, PUT")
  next();
}
app.use(allowCrossDomain);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bikes', bikesRouter);


module.exports = app;
