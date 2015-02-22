'use strict';

var config = require('../config');

var mailgun = require('mailgun-js')(config.get('mailgun:config'));

exports.send = function(to, subject, content) {

  var data = {
    from: config.get('mailgun:from'),
    to: to,
    subject: subject,
    text: content
  };

  return mailgun.messages().send(data);
};
