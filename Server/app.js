var {createServer} = require('http');
var {Server} = require('socket.io');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs')




var indexRouter = require('./routes/index');


// const productAPIRouter = require('./routes/Api/productAPI');



require("./Component/User/UserModel")




// var express = require('express-session')
const session = require('express-session');
const mongoose = require('mongoose');

//Nhat code


require('./Component/Product/productModel');

var app = express();

require('./Component/HistorySearch/historySearchModel')

require('./Component/Favorite/FavoriteModel')

require('./Component/Options/Color/colorModel')


require('./Component/Options/Size/sizeModel')

require('./Component/Notification/NotificationModel')

const productCpanelRouter= require('./routes/cpanel/ProductCpanel')
const userCpanelRouter= require('./routes/cpanel/UserCpanel')
const categoryCpanelRouter= require('./routes/cpanel/CategoryCpanel')
// mongodb+srv://nhatccg456:mcmytFu5xkrw9CwD@cluster0.fn2hqad.mongodb.net/
mongoose.connect('mongodb+srv://nhatccg456:mcmytFu5xkrw9CwD@cluster0.fn2hqad.mongodb.net/').then(() => console.log('Database Connected!')).catch(err => console.log('Database Error: ', err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// http://localhost:3000/API/productAPI
// app.use('/Api/productAPI', productAPIRouter);
// app.use('/Api/historySearchAPI', historySearchAPIRouter);
// app.use('/Api/Options/colorAPI', colorAPIRouter);
// app.use('/Api/Options/sizeAPI', sizeAPIRouter);
// app.use('/users', usersRouter);

//http://localhost:3000/api/category
// app.use('/Api/category', categoryApiRouter);
// app.use('/Api/UserApi', userApiRouter);


// app.use('/Api/favoriteApi',favoriteApiRouter);


// app.use('/users', usersRouter);
// app.use('/Api/cart', cartAPI)

// app.use('/Api/order', orderAPI);
// app.use('/Api/orderdetail', orderDetail);



// app.use('/Api/feedbackAPI', feedbackAPIRouter)
// app.use('/Api/notificationApi', notificationApiRouter);



// cpanel

// localhost:3000/cpanel/product
app.use("/cpanel/product", productCpanelRouter);
// localhost:3000/cpanel/category

app.use("/cpanel/category", categoryCpanelRouter);
// localhost:3000/cpanel/product

app.use("/cpanel/user", userCpanelRouter);

// catch 404 and forward to error handler
app.use(session({
  secret: 'agile',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the eroror page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;
