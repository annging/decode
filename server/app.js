var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var tagRouter = require('./routes/tag');
var logRouter = require('./routes/log');

var app = express();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
      info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/decode/api',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)


// 设置 Mongoose 连接
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/db_de_code';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'aabcefg', // 对session id 相关的cookie 进行签名  可以随便写
  name: 'admin_abc', // 这个会作为给cookie设置值的key
  resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
  saveUninitialized: true, // 强制将未初始化的 session 存储。默认值是true，建议设置成true
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //设置过期时间是一天  单位毫秒
  },
  rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间，默认：false
}))

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Authorization, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Credentials', 'true');//允许携带cookie
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/log', logRouter);
app.use('/decode/api', postRouter);
app.use('/decode/api', tagRouter);



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
  let result = {
    code: err.status || 500,
    message: 'error'
  }
  res.send(result);
});

module.exports = app;
