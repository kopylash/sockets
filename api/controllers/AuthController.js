var bcrypt = require('bcrypt-nodejs');

module.exports = {
  signin: function(req, res) {

    if (!req.isSocket) {
      return res.badRequest();
    }

    return Customer.findOne({
      where: {
        login: req.body.login
      }
    }).then(function(customer) {
      if (customer) {
        if (bcrypt.compareSync(req.body.password, customer.password)) {
          req.session.customerId = customer.id;
          sails.sockets.join(req, customer.id);
          return res.ok({
            id: customer.id
          });
        } else {
          return res.forbidden('Wrong password');
        }
      }
      return res.notFound('User not found');
    }).catch(function(error) {
      return res.forbidden(error.message);
    });


  }
};
