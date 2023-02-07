const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "danabijak",
  password: "root",
  port: 5432,
});

module.exports = client;
