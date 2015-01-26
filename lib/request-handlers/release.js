
exports.hello = hello;

function* hello() {
  this.body = {message: 'Hello world'};
}
