const dbEngine = require("./config").db.environment
const config = require("./knexfile")[dbEngine]

module.exports = require("knex")(config)