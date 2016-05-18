'use strict';

var Sails = require('sails').Sails,
  path = require('path'),
  Promise = require('bluebird'),
  moment = require('moment'),
  _ = require('lodash'),
  Umzug = require('umzug'),
  Sequelize = require('sequelize');

function ts() {
  return moment().format('YYYYMMDDHHmmss');
}

function createMigrator(sails) {
  var migrationsDir = getMigrationsDir(sails),
    connection = sails.config.connections[sails.config.models.connection],
    conUrl,
    conOpts = {};

  if (connection.url) {
    conUrl = connection.url;
    conOpts = connection.options;
  } else {

    conUrl = (connection.dialect || 'postgres') + '://' + connection.user + ':' +
    connection.password + '@' + connection.host + ':' + (connection.port || '5432') +
    '/' + (connection.database);
    conOpts = connection.options;
  }

  sails.log.silly("Connect: " + conUrl, conOpts);

  var db = new Sequelize(conUrl, conOpts);

  return new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db,
      tableName: 'SequelizeMeta'
    },
    upName: 'up',
    downName: 'down',
    migrations: {
      params: [db.getQueryInterface(), Sequelize],
      path: migrationsDir,
      pattern: /\.js$/
    },
    logging: sails.log.silly
  });
}

function createMigrateTask(sails) {
  var migrator = createMigrator(sails);

  var task = Object.create(migrator);
  task.undo = task.down;

  task.redo = function() {
    return this.down()
      .bind(this)
      .then(function() {
        return this.up();
      });
  };

  task.init = function() {
    return Promise.resolve();
  };

  return task;
}

function getMigrationsDir(sails) {
  return path.join(sails.config.appPath, sails.config.migrations.dir);
}

function generateSqlMigration(grunt, migrationsDir, name, timeStamp, dst) {
  var sqlUpFile = '/sqls/'+ timeStamp + '-' + name + '-up' + '.sql',
    sqlDownFile = '/sqls/'+ timeStamp + '-' + name + '-down' + '.sql',
    dstSqlUpPath = path.join(migrationsDir, sqlUpFile),
    dstSqlDownPath = path.join(migrationsDir, sqlDownFile),
    sqlTemplate = _.template(
      grunt.file.read(path.join(__dirname, '/../assets', 'migration.sql.js'),
                      {encoding: 'utf-8'})
    ),
    compiledSqlTemplate = sqlTemplate({ 'sqlUp': sqlUpFile, 'sqlDown':  sqlDownFile});

  grunt.file.mkdir(path.dirname(dstSqlUpPath));
  grunt.file.write(dst, compiledSqlTemplate, {encoding: 'utf-8'});
  grunt.file.copy(path.normalize(path.join(__dirname, '/../assets', 'migration.up.sql.tpl')), dstSqlUpPath);
  grunt.file.copy(path.normalize(path.join(__dirname, '/../assets', 'migration.down.sql.tpl')), dstSqlDownPath);
}

function generateMigration(grunt, sails, name) {
  var sqlFile = grunt.option('sql-file'),
    migrationsDir = getMigrationsDir(sails),
    timeStamp = ts(),
    dst = path.join(migrationsDir, timeStamp + '-' + name + '.js');

  grunt.file.mkdir(path.dirname(dst));

  if (sqlFile) {
    generateSqlMigration(grunt, migrationsDir, name, timeStamp, dst);
  } else {
    grunt.file.copy(path.normalize(path.join(__dirname, '/../assets', 'migration.tpl')), dst);
  }

  grunt.log.writeln('Migration created: ' + path.basename(dst));
}

function liftSails(grunt) {
  return new Promise(function(resolve, reject) {
    var sails,
      sailsConfig,
      env;

    if (grunt.option('env')) {
      env = grunt.option('env');
    } else {
      env = process.env.NODE_ENV;
    }

    sailsConfig = {
      port: -1,
      log: {level: process.env.LOG_LEVEL || 'silent'},
      environment: env,
      migrating: false,
      hooks: {
        blueprints: false,
        orm: false,
        pubsub: false,
        grunt: false
      }
    };

    sails = new Sails();
    sails.lift(sailsConfig, function(err) {
      if (err) {
        grunt.log.error(err.stack);
        return reject(err);
      }
      return resolve(sails);
    });
  });
}

function usage(grunt) {
  grunt.log.writeln('usage: grunt db:migration[:up|:down|:generate|:undo|:redo] [options]');
  grunt.log.writeln();
  grunt.log.writeln('db:migration:generate Options:');
  grunt.log.writeln('  --name=NAME  Name of the migration to create');
  grunt.log.writeln();
  grunt.log.writeln('db:migration:up  running pending migrations');
  grunt.log.writeln();
  grunt.log.writeln('db:migration:down Options:');
  grunt.log.writeln('  --name=NAME  Revert to migration with name <NAME>');
}

module.exports = function(grunt) {
  grunt.registerTask('db:migration', 'Run the database migrations', function(command) {
    var done = this.async(),
      name = grunt.option('name');

    if (!command) {
      usage(grunt);
      return done();
    }


    liftSails(grunt)
      .then(function(sails) {
        grunt.log.debug("Sails up");

        if (command === 'generate') {
          if (!name) {
            throw new Error('Name required for create new migration');
          }
          generateMigration(grunt, sails, name);
          return;
        } else {
          var task = createMigrateTask(sails);
          return task.init().then(function() {
            switch (command) {
              case 'up':
                grunt.log.writeln('Running pending migrations...');
                return task.up();
              case 'down': /* falls through */
              case 'undo':
                if (!name) {
                  grunt.log.writeln('Undoing last migration...');
                  return task.down();
                } else {
                  grunt.log.writeln('Undoing migration down to ' + name);
                  return task.down({to: name});
                }
              case 'redo':
                grunt.log.writeln('Redoing last migration...');
                return task.redo();
              default:
                var err = new Error('Unknown task: db:migration:' + command);
                throw err;
            }
          });
        }
      }).then(function() {
        grunt.log.writeln('Done!');
        done();
      })
      .catch(function(err) {
        console.log(err.stack);
        grunt.log.error(err);
        done(err);
      });
  });
};
