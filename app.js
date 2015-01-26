//Our koa app
var koa = require('koa');
var app = koa();

var config = require('./config');

//Logger
var bunyan = require('bunyan');
var logger = require('./log');

//Middlewares
var koaLogger = require('koa-bunyan');
var mask = require('koa-json-mask');
var router = require('koa-router');
app.use(koaLogger(logger, {
  level: 'debug',
  timeLimit: '100'
}));
app.use(router(app));
app.use(mask());

var releases = require('./lib/request-handlers/release');
app.get('/', releases.hello);

app.listen(config.get('server:port'));
logger.info('Running server on port', config.get('server:port'));
