'use strict';

var bluebird = require('bluebird');
var google = require('googleapis');
var user = require('../repositories/user');

var profile = google.oauth2('v2');
bluebird.promisifyAll(profile.userinfo);
var oauth2Client = new google.auth.OAuth2();

function* authenticate() {
  /*jshint validthis: true */
  var ctx = this;
  var body = this.request.body;
  if (body.google) {

    oauth2Client.setCredentials({
      access_token: body.google
    });

    yield profile.userinfo.getAsync({url: 'profile', auth: oauth2Client}).then(function(response) {
      ctx.log.info(response[0]);
    }, function(err) {
      ctx.log.info(err);
    });
  }
  this.log.info(this.request.body);
  this.throw(401, 'Username or password is wrong.', {safe: true});
}
exports.authenticate = authenticate;
