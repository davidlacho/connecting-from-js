require('dotenv').config();
const moment = require('moment');
const settings = require('./settings');
const knex = require('knex')(settings);

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
