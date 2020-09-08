// Database Import
const connection = require('../common/dbconfig');

const router = require('express').Router( );

// GET ALL EMPLOYEES
router.get('/', (request, response) => {
    let sql = "SELECT * FROM employee";

    connection.query(sql, (err, res) => {
        if (err) throw err;

        response.send(res);
    });
});

// CREATE AN EMPLOYEE
router.post('/', async(request, response) => {
    let sql = "INSERT INTO client SET ?";
    let values = request.body;

    await connection.query(sql, values, (err, res) => {
        if (err) throw err;

        response.send(res);
    });
});

module.exports = router;