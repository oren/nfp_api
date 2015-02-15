'use strict';

var createError = require('http-errors');

function* errorHandler(next){
  try {
    yield next;
  }
  catch (e) {
    var error = e;
    if (!error.safe) {
      this.log.error(error);
      error = createError(500, 'Unknown error occured');
    }
    this.status = error.statusCode;
    this.body = {
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
      body: error.body || {}
    };
  }
}
exports.errorHandler = errorHandler;
