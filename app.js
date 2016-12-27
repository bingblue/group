const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const settings = require('./models/settings');
const glob = require('glob');
//const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(multer({
//   dest: 'public/img/temp',
//   rename: function (fieldname, filename) {
//     //原来文件名
//     return filename;
//     //return Date.now()+filename;
//   }
// }));
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    //db: settings.db,
    //host: settings.host,
    //port: settings.port,
    url:settings.url,
    autoRemove:'native'
  })
}));

// 加载路由
//app.use('/', index);
glob.sync('routes/**/*.js').sort((x,y) =>{
    //排序，先加载所有index的路由
    if(x.indexOf('index') > -1)return -1;
    return 1;
}).forEach(file => {
  const route = require("./"+file);
  //生成URL路径,去掉.js,去掉routes
  let urlPath = file.replace(/\.[^.]*$/, '').replace('routes', '').replace('index','');
  console.log(urlPath+"==="+file);
  app.use(urlPath, route);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
