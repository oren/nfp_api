'use strict';

var bluebird = require('bluebird');
var google = require('googleapis');

var profile = google.oauth2('v2');
bluebird.promisifyAll(profile.userinfo);
var oauth2Client = new google.auth.OAuth2();

function getProfile(token) {
  oauth2Client.setCredentials({
    access_token: token
  });

  return profile.userinfo.getAsync({url: 'profile', auth: oauth2Client});
}

exports.getProfile = getProfile;
