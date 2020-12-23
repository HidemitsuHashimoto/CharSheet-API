// Update with your config settings.
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  dev: {
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
    migrations: {
        directory: path.join(__dirname, 'src', 'migrations'),
        extension: 'ts',
        tableName: "knex_migrations",
    }
  }
};
