module.exports = {
  handshake: function(req, res) {

    if (!req.isSocket) {
      return res.badRequest();
    }

    return Plug.findOne({
      where: {
        id: req.body.id
      },
      include: {
        model: Customer,
        as: 'customer'
      }
    }).then(function(plug) {
      if (plug != null) {
        plug.set('enabled', req.body.enabled);
        return plug.save();
      }
      throw new Error('WRONG UUID of socket plug');
    }).then(function(plug) {
      sails.sockets.join(req, plug.customer.id);
      sails.sockets.broadcast(plug.customer.id, 'greeting', req.body.id, req);
      return res.ok('йоу');
    }).catch(function(error) {
      return res.forbidden(error.message);
    });


  }
};
