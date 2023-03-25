const cg = require("./config")
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
        port : cg.db.port,
        host : cg.db.host,
        user : cg.db.user,
        password : cg.db.password,
        database : cg.db.database,
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type == 'JSON') {
                return (JSON.parse(field.string()));
            }
            return next();
        }
    },
    pool: { 
        min: 2,
        max: 30
    },
    migrations: {
        tableName: 'knex_client_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
        port : cg.db.port,
        host : cg.db.host,
        user : cg.db.user,
        password : cg.db.password,
        database : cg.db.database,
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type == 'JSON') {
                return (JSON.parse(field.string()));
            }
            return next();
        }
    },
    pool: {
        min: 2,
        max: 30
    },
    migrations: {
        tableName: 'knex_client_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
        port : cg.db.port,
        host : cg.db.host,
        user : cg.db.user,
        password : cg.db.password,
        database : cg.db.database,
        dateStrings: true,
        typeCast: function (field, next) {
            if (field.type == 'JSON') {
                return (JSON.parse(field.string()));
            }
            return next();
        }
    },
    pool: {
        min: 2,
        max: 30
    },
    migrations: {
        tableName: 'knex_client_migrations'
    }
  }

};
