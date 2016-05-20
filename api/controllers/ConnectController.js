module.exports = {
  handshake: function(req, res) {

    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req, 'funSockets');
    // Broadcast a "hello" message to all the fun sockets.
    // This message will be sent to all sockets in the "funSockets" room,
    // but will be ignored by any client sockets that are not listening-- i.e. that didn't call `io.socket.on('hello', ...)`
    sails.sockets.broadcast('funSockets', 'greeting', req.body.socketName, req);

    // Respond to the request with an a-ok message
    return res.ok('йоу');
  }
};
