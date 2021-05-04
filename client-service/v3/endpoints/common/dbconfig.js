const mysql = require('mysql');

require('dotenv').config( );

// RDS Connection Info imported from serverless.yml
const connection = mysql.createConnection({
    host            : process.env.RDS_HOST,
    user            : process.env.RDS_USER,
    password        : process.env.RDS_PASSWORD,
    database        : process.env.RDS_DATABASE_NAME,
    port            : '3306',
    multipleStatements: true
});

module.exports = connection;