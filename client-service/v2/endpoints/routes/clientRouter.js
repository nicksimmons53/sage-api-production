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

router.get('/:clientId/client-data', async(request, response) => {
  let sql1 = "SELECT * FROM client_info where client_id=?;";
  let sql2 = "SELECT * FROM contact where clientId=?;";
  let sql3 = "SELECT * FROM countertop_program where client_id=?;";
  let sql4 = "SELECT * FROM tile_program where client_id=?;";
  let sql5 = "SELECT * FROM wood_program where client_id=?;";
  let sql6 = "SELECT * FROM carpet_program where client_id=?;";
  let sql7 = "SELECT * FROM cabinet_program where client_id=?;";

  let clientIdArray = Array(7).fill(request.params.clientId);

  await connection.query(sql1.concat(sql2, sql3, sql4, sql5, sql6, sql7), [...clientIdArray], (err, res) => {
    if (err) throw err;

    let result = {
      clientInfo: res[0][0],
      contacts: res[1],
      countertopProgram: res[2][0],
      tileProgram: res[3][0],
      woodProgram: res[4][0],
      carpetProgram: res[5][0],
      cabinetProgram: res[6][0]
    };

    response.send(result);
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