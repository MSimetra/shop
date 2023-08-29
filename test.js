'use strict'

require('dotenv').config();
const Knex = require('knex');

const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});


const test = async () => {
  const res = (user_name) => knex.select().from('users')
  // const res = await knex('users'); 
  console.log(await res('c'));
  // return 
}

test();

// knex('users').then(users => console.log(users))
// console.log(knex('users'));
