'use strict';

var _ = require('lodash');

function forgotPassword(name, url, ip) {
  return _.template(
    //Limit                                                      |
    'Greetings <%= name %>\n'+
    '\n'+
    'A password reset request for http://nfp.is was sent to this\n'+
    'email address. If this was intentional, please click the\n'+
    'link below.\n'+
    '\n'+
    'Request originated from: <%= ip %>\n'+
    '<%= url %>\n'+
    '\n'+
    'If you don\'t recognise this then please ignore.\n'+
    '\n'+
    '\n'+
    'Best regards:\n'+
    'NFP'
  )({name: name, url: url, ip: ip});
}
exports.forgotPassword = forgotPassword;

function signup(name, url, ip) {
  return _.template(
    //Limit                                                      |
    'Greetings <%= name %>\n'+
    '\n'+
    'You\'re almost done with signing up an account on http://nfp.is.\n'+
    'Click the link below to finish registration.\n'+
    '\n'+
    'Request originated from: <%= ip %>\n'+
    'Finish signup: <%= url %>\n'+
    '\n'+
    'If you don\'t recognise this then please ignore.\n'+
    '\n'+
    '\n'+
    'Best regards:\n'+
    'NFP'
  )({name: name, url: url, ip: ip});
}
exports.signup = signup;
