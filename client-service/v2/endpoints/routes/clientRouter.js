const express = require('express');
const router = express.Router({ mergeParams: true });
const connection = require('../common/dbconfig');

// Import Other Route Files
router.use('/:clientId/contacts', require('./contactRouter'));
router.use('/:clientId/parts', require('./partRouter'));
router.use('/:clientId/program', require('./programRouter'));

// Retrieve employee clients
router.get('/', async(request, response) => {
  let sql = "SELECT * FROM client WHERE empnum = ? ORDER BY clnnme;";

  await connection.query(sql, [ request.params.empId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve a single client
router.get('/:clientId', async(request, response) => {
  let sql = "SELECT * FROM client WHERE empnum = ? and id = ?;";

  await connection.query(sql, [ request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Create client
router.post('/', async(request, response) => {
  let sql = "INSERT INTO client SET ?;";

  await connection.query(sql, request.body, (err, res) => {
    if (err) throw err;

    response.status(201).send(res);
  });
});

// Retrieve a client's addresses
router.get('/:clientId/address', async(request, response) => {
  let sql = "SELECT " +
  "addrs1, addrs2, ctynme, state_, zipcde, " +
  "bilad1, bilad2, bilcty, bilste, bilzip, " +
  "shpad1, shpad2, shpcty, shpste, shpzip " + 
  "FROM client " +
  "WHERE empnum = ? and id = ?;";

  await connection.query(sql, [ request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.get('/:clientId/advanced-info', async(request, response) => {
  let sql = "SELECT * FROM client_info where client_id=?";

  await connection.query(sql, request.params.clientId, (err, res) => {
      if (err) throw err;
  
      response.send(res);
  });
});

// Update Client Info
router.put('/:clientId', async(request, response) => {
  let sql = "UPDATE client SET ? WHERE empnum = ? AND id = ?;";

  await connection.query(sql, [ request.body, request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.post('/:clientId/advanced-info', async(request, response) => {
  let sql = "INSERT INTO client_info SET ? ON DUPLICATE KEY UPDATE ?;";

  connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

module.exports = router;