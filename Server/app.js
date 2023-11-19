var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const categoryApiRouter = require('./routes/api/CategoryApi');
const userApiRouter = require('./routes/api/UserApi');

// var express = require('express-session')
var app = express();
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/SavvyDatabase?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database Connected!')).catch(err => console.log('Database Error: ', err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//http://localhost:3000/api/category
app.use('/Api/category', categoryApiRouter);
app.use('/Api/UserApi', userApiRouter);

// catch 404 and forward to error handler
app.use(session({
  secret: 'agile',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

module.exports = app;
