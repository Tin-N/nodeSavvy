var {createServer} = require('http');
var {Server} = require('socket.io');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const categoryApiRouter = require('./routes/api/CategoryApi');
// var express = require('express-session')
var app = express();
const session = require('express-session');
const mongoose = require('mongoose');

//Nhat code
const httpServer = createServer();

const io = new Server(5000,
  {cors:{
    origin:process.env.NODE_ENV ==="production"?false :["http://localhost:5000"]
  }}
)

io.on("connection",socket=>{
  console.log(`a user connected with id ${socket.id}`);
  socket.on('message',data=>{
    console.log(data);
    io.emit('message',`${socket.id.substring(0,5)}: ${data}`)
  })
  
})
httpServer.listen(3500,()=>console.log("Listening on port 3500 ..."))

require('./Component/Product/productModel')
const productAPIRouter = require('./routes/Api/productAPI');


require('./Component/HistorySearch/historySearchModel')
const historySearchAPIRouter = require('./routes/Api/historySearchAPI');


require('./Component/Options/Color/colorModel')
const colorAPIRouter = require('./routes/Api/Options/ColorApi');


require('./Component/Options/Size/sizeModel')
const sizeAPIRouter = require('./routes/Api/Options/SizeApi');




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
app.use('/Api/productAPI', productAPIRouter);
app.use('/Api/historySearchAPI', historySearchAPIRouter);
app.use('/Api/Options/colorAPI', colorAPIRouter);
app.use('/Api/Options/sizeAPI', sizeAPIRouter);

app.use('/users', usersRouter);
//http://localhost:3000/Api/category
app.use('/Api/category', categoryApiRouter);
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
