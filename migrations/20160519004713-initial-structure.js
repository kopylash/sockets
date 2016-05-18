'use strict';

var Promise = require('bluebird'),
  fs = require('fs'),
  path = require('path');

Promise.promisifyAll(fs);

module.exports = {
  up: function (queryInterface, Sequelize) {
    return fs.readFileAsync(path.join(__dirname, '/sqls/20160519004713-initial-structure-up.sql'),{encoding: 'utf-8'})
      .then(function (content) {
        return queryInterface.sequelize.query(content);
      });
  },

  down: function (queryInterface, Sequelize) {
    return fs.readFileAsync(path.join(__dirname, '/sqls/20160519004713-initial-structure-down.sql'),{encoding: 'utf-8'})
      .then(function (content) {
        return queryInterface.sequelize.query(content);
      });
  }
};
