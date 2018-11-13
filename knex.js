require('dotenv').config();
const moment = require('moment');

const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    hostname: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
  },
});

knex.select('*')
  .from('famous_people')
  .where('first_name', 'LIKE', 'Paul')
  .orWhere('last_name', 'LIKE', 'Paul')
  .asCallback((err, rows) => {
    if (err) {
      console.log(err)
    }
    rows.forEach((entry, index) => {
      console.log(`- ${index+1 }: ${entry.first_name} ${entry.last_name}, born '${moment(entry.birthdate).format('YYYY-MM-DD')}'`);
    })
    knex.destroy();
  });
