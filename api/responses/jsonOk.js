module.exports = function (data, options) {

  var req = this.req,
    res = this.res,
    sails = req._sails,
    options = options || {},
    status = options.status || 'ok';

  sails.log.silly('res.jsonOk() :: Sending 200 ("OK") response');
  sails.log.silly('data: ', data);

  // Set status code
  res.status(200);

  return res.json({status: status, data: data});
};
