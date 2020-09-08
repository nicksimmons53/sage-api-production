const express = require('express');
const router = express.Router({ mergeParams: true });

const connection = require('../common/dbconfig');

// Retrieve client parts
router.get('/:programId', async(request, response) => {
  let sql = "SELECT * FROM part WHERE clntid = ? and prgrm_ = ?;";

  await connection.query(sql, [ request.params.clientId, request.params.programId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.post('/', async(request, response) => {
  let sql = "INSERT INTO part SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

module.exports = router;