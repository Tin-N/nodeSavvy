var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var express = require('express-session')
const session = require('express-session');
const mongoose = require('mongoose');

require('./Component/Product/productModel');
const feedbackAPIRouter = require('./routes/Api/feedbackAPI');
const productAPIRouter = require('./routes/Api/productAPI');
var app = express();


require('./Component/HistorySearch/historySearchModel')
const historySearchAPIRouter = require('./routes/Api/historySearchAPI');


require('./Component/Options/Color/colorModel')
const colorAPIRouter = require('./routes/Api/Options/ColorApi');


require('./Component/Options/Size/sizeModel')
const sizeAPIRouter = require('./routes/Api/Options/SizeApi');

require('./Component/SaleOff/SaleOffModel')
const saleOffRouter = require('./routes/Api/saleOffAPI');
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
// http://localhost:3000/API/productAPI
app.use('/Api/productAPI', productAPIRouter);
app.use('/Api/historySearchAPI', historySearchAPIRouter);
app.use('/Api/Options/colorAPI', colorAPIRouter);
app.use('/Api/Options/sizeAPI', sizeAPIRouter);
app.use('/Api/saleOffAPI', saleOffRouter)
app.use('/users', usersRouter);
app.use('/Api/feedbackAPI', feedbackAPIRouter)
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
  // render the eroror page
  res.status(err.status || 500);
  res.render('error');
  
});

module.exports = app;
