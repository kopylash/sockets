'use strict';

var Promise = require('bluebird'),
  fs = require('fs'),
  path = require('path');

Promise.promisifyAll(fs);

module.exports = {
  up: function (queryInterface, Sequelize) {
    return fs.readFileAsync(path.join(__dirname, '<%= sqlUp %>'),{encoding: 'utf-8'})
      .then(function (content) {
        return queryInterface.sequelize.query(content);
      });
  },

  down: function (queryInterface, Sequelize) {
    return fs.readFileAsync(path.join(__dirname, '<%= sqlDown %>'),{encoding: 'utf-8'})
      .then(function (content) {
        return queryInterface.sequelize.query(content);
      });
  }
};
