var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


const initMongo = require('./config/mongo');

var app = express();


app.use(logger('dev'));
app.use(express.json({
  limit: '20mb'
}));
app.use(cors());
app.use(express.urlencoded({  limit: '20mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// configuring routes

app.use(require('./src/routes'));

// catch 404 and forward to error handler
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
  res.send('error');
});

initMongo();

module.exports = app;
