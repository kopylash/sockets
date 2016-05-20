var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var config = require('./config.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = config.apiURL;
io.sails.reconnection = false;

var data = {id: process.argv[2]};
console.log(data);

// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/hello', data, function serverResponded(body, res) {
  // body === res.body
  console.log('Sails responded with: ', body);
  console.log('with headers: ', res.headers);
  console.log('and with status code: ', res.statusCode);

  if (res.statusCode === 403) {
    io.socket.disconnect();
  }
});

io.socket.on('greeting', (msg)=> {
  console.log('hello ', msg);
});
