module.exports = {
  getInstance: function(interval, intervalType, cb) {
    return new Aggregator(interval, intervalType, cb);
  }
};

function Aggregator(interval, intervalType, cb) {
  this.storage = {};

  var nextDate = new Date();
  if (nextDate.getMinutes() === 0 && nextDate.getSeconds() === 0) {
    callEveryInterval.call(this, cb, getMilliseconds(interval, intervalType));
  } else {
    switch (intervalType) {
      case 'hh':
        nextDate.setHours(nextDate.getHours() + interval);
        nextDate.setMinutes(0);
        nextDate.setSeconds(0);
        break;
      case 'mm':
        nextDate.setMinutes(nextDate.getMinutes() + interval);
        nextDate.setSeconds(0);
        break;
      case 'ss':
        nextDate.setSeconds(nextDate.getSeconds() + interval);
        break;
    }

    var difference = nextDate - new Date();
    setTimeout(callEveryInterval.bind(this, cb, getMilliseconds(interval, intervalType)), difference);
  }
}

function callEveryInterval(cb, interval) {
  cb.call(this);
  setInterval(cb.bind(this), interval);
}

function getMilliseconds(interval, intervalType) {
  switch (intervalType) {
    case 'hh':
      return interval * 3600 * 1000;
    case 'mm':
      return interval * 60 * 1000;
    case 'ss':
      return interval * 1000;
  }
}
