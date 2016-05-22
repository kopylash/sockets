var aggregator = AggregatorFactory.getInstance(1, 'mm', saveData);
var accumulator = AggregatorFactory.getInstance(10, 'ss', sendDataToCustomers);

module.exports = {
  create: function(req, res) {
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
      if (!aggregator.storage[plug.id]) {
        aggregator.storage[plug.id] = 0;
      }
      aggregator.storage[plug.id] += req.body.usage;

      if (!accumulator.storage[plug.customer.id]) {
        accumulator.storage[plug.customer.id] = 0;
      }
      accumulator.storage[plug.customer.id] += req.body.usage;

      return res.ok();
    });


  }
};

function saveData() {
  if (Object.keys(this.storage).length) {
    console.log(this.storage);
    var usage = _.cloneDeep(this.storage);
    this.storage = {};

    Object.keys(usage).forEach(function(plugId) {
      EnergyUsage.create({
        value: usage[plugId],
        plugId: plugId
      })
    })
  }
}

function sendDataToCustomers() {
  if (Object.keys(this.storage).length) {
    var usage = _.cloneDeep(this.storage);
    this.storage = {};
    Object.keys(usage).forEach(function(customerId) {
      sails.sockets.broadcast(customerId, 'energyUsage', usage[customerId]);
    })
  }
}
