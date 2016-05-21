var aggregator = AggregatorFactory.getInstance();
console.log('agg');
module.exports = {
  create: function(req, res) {


    if (!req.isSocket) {
      return res.badRequest();
    }
    console.log('id', req.body.id);
    console.log('usage', req.body.usage);

    return Plug.findOne({
      where: {
        id: req.body.id
      }
    }).then(function(plug) {
      if (!aggregator.storage[plug.id]) {
        aggregator.storage[plug.id] = 0;
      }
      aggregator.storage[plug.id] += req.body.usage;
      return res.ok();
    });


  }
};
