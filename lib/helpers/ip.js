'use strict';

function getIp(req) {
  return req.headers['x-real-ip'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
}
exports.getIp = getIp;
