const express = require('express');
const router = express.Router({ mergeParams: true });
const connection = require('../../common/dbconfig');

// Retrieve all Client Contacts
router.get('/', async(request, response) => {
    let sql = "SELECT * FROM contact WHERE clientId=?;";

    connection.query(sql, request.params.clientId, (err, res) => {
        if (err) throw err;

        response.send(res);
    })
});

router.post('/', async(request, response) => {
  let sql = "INSERT INTO contact SET ?;";

  connection.query(sql, request.body, (err, res) => {
      if (err) throw err;

      response.send(res);
  });
});

router.delete('/:contactID', async(request, response) => {
    let sql = "DELETE FROM contact WHERE id=?;";

    await connection.query(sql, request.params.contactID, (err, res) => {
        if (err) throw err;

        console.log(request);

        response.send(res);
    });
});

module.exports = router;