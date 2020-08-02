const mysql = require('mysql');
const dbConfig = require('../config/db.config');

// Create connection to MySQL DB
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Open connection
connection.connect(error => {
    if (error) throw error;
    console.log('Connected to MySQL backlog-bot DB.');
});

module.exports = connection;
