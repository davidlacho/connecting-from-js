require('dotenv').config();
const {
  Client,
} = require('pg');
const moment = require('moment');

const connection = (dbclient, name) => new Promise((resolve, reject) => {
  console.log(`Searching for ${name}...`);
  dbclient.connect((err) => {
    if (err) {
      reject(err);
    }
    dbclient.query('SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text', [name], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const
          queryResults = results.rows;
        resolve(queryResults);
      }
    });
  });
})
  .then((queryResults) => {
    queryResults.forEach((entry, index) => {
      console.log(`- ${index+1 }: ${entry.first_name} ${entry.last_name}, born '${moment(entry.birthdate).format('YYYY-MM-DD')}'`);
    });
    dbclient.end();
  })
  .catch((err) => {
    dbclient.end();
    console.log('error', err);
  });


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  hostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
};

const client = new Client(dbConfig);
connection(client, process.argv[2]);
