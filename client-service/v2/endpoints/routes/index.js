require('dotenv').config( );

const express = require('express');
const router = express.Router( );
const connection = require('../common/dbconfig');

// Default Response
router.get('/', async(req, res) => {
    res.send("This is MC Surfaces - Sage API.");
});

router.get('/email_login', async(request, response) => {
  let email = request.query.email;
  let sql = "SELECT * FROM employee where e_mail=?";

  connection.query(sql, email, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.use('/employee', require('./employeeRouter'));
router.use('/admin', require('./adminRouter'));

module.exports = router;