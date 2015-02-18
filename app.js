'use strict';

var koa = require('koa');
var cors = require('koa-cors');
var koaLogger = require('koa-bunyan-logger');
var mask = require('koa-json-mask');
var router = require('koa-router');
var koaBody = require('koa-better-body')({fieldsKey: false});
var jwt = require('koa-jwt');

var config = require('./lib/config');
var log = require('./lib/log');
var error = require('./lib/helpers/error');

//Our koa app
var app = koa();

//Middlewares
app.use(error.errorHandler);
app.use(koaLogger(log));
app.use(koaLogger.requestIdContext({header: 'Request-Id'}));
app.use(koaLogger.requestLogger({
  updateLogFields: function(fields) {
    return {duration: fields.duration};
  }
}));

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(jwt({
  secret: config.get('jwt:secret'),
  passthrough: true
}));
app.use(router(app));
app.use(mask());

//Routes
var authentication = require('./lib/request-handlers/authentication');
var authenticated = authentication.authenticated;
app.post('/authenticate', koaBody, authentication.authenticate);

var category = require('./lib/request-handlers/category');
app.get('/categories', category.categories);

var nav = require('./lib/request-handlers/nav');
app.get('/nav', nav.getNav);

var profile = require('./lib/request-handlers/profile');
app.get('/profile', authenticated, profile.getProfile);
app.post('/profile', authenticated, koaBody, profile.updateProfile);

var releases = require('./lib/request-handlers/release');
app.get('/', releases.hello);


//Error logging
app.on('error', function(err) {
  log.error(err, 'Unknown error occured');
});


//Run the server
app.listen(config.get('server:port'));
log.info('Running api server on port', config.get('server:port'));
