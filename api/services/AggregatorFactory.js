module.exports = {
  getInstance: function() {
    return new Aggregator();
  }
};

function Aggregator() {
  this.storage = {};

  var nextDate = new Date();
  if (nextDate.getMinutes() === 0 && nextDate.getSeconds() === 0) {
    callEveryHour.call(this);
  } else {
    // nextDate.setHours(nextDate.getHours() + 1);
    nextDate.setMinutes(nextDate.getMinutes() + 1);
    nextDate.setSeconds(0);

    var difference = nextDate - new Date();
    setTimeout(callEveryHour.bind(this), difference);
  }
}

function callEveryHour() {
  collectData.call(this);
  setInterval(collectData.bind(this), 1000 * 10);
}

function collectData() {
  if (Object.keys(this.storage).length) {
    console.log(this.storage);
  }

  //cloning storage
  var usage = {};
  for (var key in this.storage) {
    if (this.storage.hasOwnProperty(key)) {
      usage[key] = this.storage[key];
    }
  }
  this.storage = {};

  var date = new Date();
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  Object.keys(usage).forEach(function(plugId) {
    EnergyUsage.create({
      date: date,
      value: usage[plugId],
      plugId: plugId
    })
  })
}
