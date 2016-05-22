module.exports = function (data, options) {

  var req = this.req,
    res = this.res,
    sails = req._sails,
    options = options || {},
    status = options.status || 'error',
    error;

  sails.log.verbose('res.jsonBad() :: Sending json bad response', data);

  if (data instanceof Error) {
    sails.log.silly(data.stack);
    error = data.message;
  } else {
    error = data;
  }

  // Set status code
  res.status(200);

  return res.json({status: status, errorMsg: error});
};
