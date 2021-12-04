require("dotenv").config();
const { Pool } = require('pg');

const args = process.argv;
const cohort_request = args.slice(2);
const cohort_result = cohort_request[0];
const limit_result = cohort_request[1] || 5;
const values = [`%${cohort_result}%`, limit_result];

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

const queryString = `
SELECT students.id, students.name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name like $1
LIMIT $2
`
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
});