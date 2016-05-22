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

var ID = process.argv[2];
var data = {
  id: ID,
  enabled: true
};
console.log(data);

io.socket.get('/hello', data, function serverResponded(body, res) {
  // body === res.body
  console.log('Sails responded with: ', body);
  console.log('with headers: ', res.headers);
  console.log('and with status code: ', res.statusCode);

  if (res.statusCode === 403) {
    io.socket.disconnect();
  }

  setInterval(generateUsage, 1000)
});

io.socket.on('greeting', (msg)=> {
  console.log('hello ', msg);
});

function generateUsage() {
  var min = 40,
    max = 70,
    data = {
      id: ID,
      usage: Math.floor(Math.random() * (max - min + 1)) + min
    };
  io.socket.post('/energy/usage', data);
}
