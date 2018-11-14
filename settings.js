require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    hostname: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
  },
};
