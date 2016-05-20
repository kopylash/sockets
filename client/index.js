var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var config = require('./config.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = config.apiURL;
// ...
var data = {socketName: process.argv[2]};
// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/hello', data, function serverResponded(body, JWR) {
  // body === JWR.body
  console.log('Sails responded with: ', body);
  console.log('with headers: ', JWR.headers);
  console.log('and with status code: ', JWR.statusCode);

});

io.socket.on('greeting', (msg)=> {
  console.log('hello ', msg);
});
