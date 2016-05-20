module.exports = {
  handshake: function(req, res) {

    if (!req.isSocket) {
      return res.badRequest();
    }

    return Plug.findOne({
      where: {
        id: req.body.id
      }
    }).then(function(plug) {
      if (plug != null) {
        sails.sockets.join(req, 'funSockets');
        sails.sockets.broadcast('funSockets', 'greeting', req.body.id, req);
        return res.ok('йоу');
      }
      return res.forbidden('WRONG UUID of socket plug');
    });


  }
};
