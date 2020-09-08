// Database Import
const connection = require('../common/dbconfig');
const router = require('express').Router( );
const crypto = require('crypto');

router.use('/:empId/clients', require('./clientRouter'));

// Retrieve all employees
router.get('/', async(request, response) => {
  let sql = "SELECT * FROM employee;";

  await connection.query(sql, (err, res) => {
    if (err) throw err;
    
    response.send(res);
  });
});

// Retrieve employee data by ID
router.get('/:empId', async(request, response) => {
  let sql = "SELECT * FROM employee where recnum = ?;";

  await connection.query(sql, [ request.params.empId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Create employee
router.post('/', async(request, response) => {
  let sql = "INSERT INTO employee SET ?;";

  // Hash Password
  let hashedPwd = crypto.createHash('sha256').update(request.body.passwd).digest('hex');
  request.body.passwd = hashedPwd;

  await connection.query(sql, request.body, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Employee Login
router.post('/login', async(request, response) => {
  let sql = "SELECT * FROM employee WHERE e_mail = ?;";

  // Hash Password
  let hashedPwd = crypto.createHash('sha256').update(request.body.passwd).digest('hex');

  await connection.query(sql, request.body.e_mail, (err, res) => {
    if (err) 
      response.send({ code: 400, message: "Error Occurred.", result: res });
    
    if (res[0].passwd === hashedPwd)
      response.send({ code: 200, message: "Login Successful.", result: res });
    
    if (res[0].passwd !== hashedPwd)
      response.send({ code: 204, message: "Login Unsuccessful.", result: res });
  });
});

module.exports = router;