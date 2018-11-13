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

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthdate = moment(process.argv[4]);

const famousPerson = {
  first_name: firstName,
  last_name: lastName,
  birthdate: birthdate.format('YYYY-MM-DD HH:mm'),
};


knex('famous_people').insert(famousPerson)
  .asCallback((err, results) => {
    if (err) {
      console.log('err', err);
    }
    console.log(results);
    knex.destroy();
  });
