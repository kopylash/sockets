/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */
module.exports.connections = {
  development: {
    user: 'postgres',
    password: '',
    database: 'sockets',
    host: 'localhost',
    options: {
      dialect: 'postgres',
      maxConcurrentQueries: 2,
      pool: {
        max: 1,
        min: 0,
        idle: 500
      }
    }
  },
  //dev host
  // dev: {
  //   url: process.env.DATABASE_URL,
  //   user: 'zvfzqcsbaylphb',
  //   password: 'q0beVWlVpiKzya5ALtKa6y-Kqk',
  //   database: 'd93g45rk1tebsu',
  //   options: {
  //     host: 'ec2-54-228-183-183.eu-west-1.compute.amazonaws.com',
  //     dialect: 'postgres',
  //     maxConcurrentQueries: 2,
  //     pool: {
  //       max: 1,
  //       min: 0,
  //       idle: 500
  //     }
  //   }
  // }

};
