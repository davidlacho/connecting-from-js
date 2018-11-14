require('dotenv').config();
const moment = require('moment');
const settings = require('./settings.js');


const knex = require('knex')(settings);

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
