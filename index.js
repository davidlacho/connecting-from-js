require('dotenv').config();
const {
  Client,
} = require('pg');

const connection = dbclient => new Promise((resolve, reject) => {
  dbclient.connect((err) => {
    if (err) {
      reject(err);
    }
    dbclient.query('SELECT $1::int AS number', ['1'], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const {
          number,
        } = results.rows[0];
        dbclient.end();
        resolve(number);
      }
    });
  });
})
  .then((queryResults) => {
    console.log('queryResults', queryResults);
  })
  .catch(err => console.log('error', err));


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  hostname: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
};


const client = new Client(dbConfig);
connection(client);
