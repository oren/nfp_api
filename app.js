'use strict';

//Our koa app
var koa = require('koa');
var app = koa();

var config = require('./lib/config');

//Logger
var logger = require('./lib/log');

//Middlewares
var cors = require('koa-cors');
var koaLogger = require('koa-bunyan');
var mask = require('koa-json-mask');
var router = require('koa-router');
app.use(koaLogger(logger, {
  level: 'debug',
  timeLimit: '100'
}));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(router(app));
app.use(mask());

//Routes
var authentication = require('./lib/request-handlers/authentication');
app.post('/authenticate', authentication.authenticate);

var category = require('./lib/request-handlers/category');
app.get('/categories', category.categories);

var nav = require('./lib/request-handlers/nav');
app.get('/nav', nav.getNav);

var releases = require('./lib/request-handlers/release');
app.get('/', releases.hello);


//Error logging
app.on('error', function(err) {
  if (err.message !== 'Unauthorized') {
    logger.error(err, 'Unknown error occured');
  }
});


//Run the server
app.listen(config.get('server:port'));
logger.info('Running api server on port', config.get('server:port'));
