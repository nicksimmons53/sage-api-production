require('dotenv').config( );

// Database Import
const connection = require('../common/dbconfig');
const router = require('express').Router( );

router.get('/queued', (request, response) => {
    let sql = "SELECT * FROM queued_client join client on queued_client.clientId=client.id join employee on client.empnum=employee.recnum;";

    connection.query(sql, (req, res) => {
        response.send(res);
    });
});

module.exports = router;