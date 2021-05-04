require('dotenv').config( );

const express = require('express');
const router = express.Router({ mergeParams: true });
const connection = require('../../common/dbconfig');

// Retrieve employee clients
router.get('/', async(request, response) => {
  let sql = 
  `SELECT client.id, clnnme, fstnme, lstnme FROM client 
    join employee on empnum=recnum
    order by clnnme;`;

  connection.query(sql, [ ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

module.exports = router;