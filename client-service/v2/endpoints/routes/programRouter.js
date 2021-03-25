require('dotenv').config( );

const express = require('express');
const router = express.Router({ mergeParams: true });

const connection = require('../common/dbconfig');

// Retrieve client tile program
router.get('/tileProgram', async(request, response) => {
  let sql = "SELECT * FROM tile_program WHERE client_id = ?;";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client wood program
router.get('/woodProgram', async(request, response) => {
  let sql = "SELECT * FROM wood_program where client_id=?";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client carpet program
router.get('/carpetProgram', async(request, response) => {
  let sql = "SELECT * FROM carpet_program where client_id=?";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client countertop program
router.get('/countertopProgram', async(request, response) => {
  let sql = "SELECT * FROM countertop_program WHERE client_id=?;";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client countertop program
router.get('/cabinetProgram', async(request, response) => {
  let sql = "SELECT * FROM cabinet_program WHERE client_id=?;";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client tile program
router.post('/tileProgram', async(request, response) => {
  let sql = "INSERT INTO tile_program SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.post('/woodProgram', async(request, response) => {
  let sql = "INSERT INTO wood_program SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [request.body, request.body], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.post('/carpetProgram', async(request, response) => {
  let sql = "INSERT INTO carpet_program SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [request.body, request.body], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client tile program
router.post('/countertopProgram', async(request, response) => {
  let sql = "INSERT INTO countertop_program SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.post('/cabinetProgram', async(request, response) => {
  let sql = "INSERT INTO cabinet_program SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [request.body, request.body], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

module.exports = router;