const express = require('express');
const router = express.Router({ mergeParams: true });

const connection = require('../common/dbconfig');

// Retrieve client parts
router.get('/', async(request, response) => {
  let clientId = request.query.client;
  let program = request.query.program;
  let table = request.query.table;

  let sql = "SELECT * FROM billing_part WHERE client_id=? AND program=? AND programTable=? ORDER BY id;";

  await connection.query(sql, [ clientId, program, table ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Get all parts 
router.get('/tile-program', async(request, response) => {
  let sql1 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Floor Tile' ORDER BY id;";
  let sql2 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Bathroom Wall Tile' ORDER BY id;";
  let sql3 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Backsplash Wall Tile' ORDER BY id;";
  let sql4 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Fireplace Wall Tile' ORDER BY id;";
  let sql5 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Floor Stone' ORDER BY id;";
  let sql6 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Bathroom Wall Stone' ORDER BY id;";
  let sql7 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Backsplash Wall Stone' ORDER BY id;";
  let sql8 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Fireplace Wall Stone' ORDER BY id;";
  let sql9 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Shower Pans - Stone' ORDER BY id;";
  let sql10 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Shower Pans - Tile' ORDER BY id;";
  let sql11 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Shower Pans - Deco' ORDER BY id;";
  let sql12 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Underlayment' ORDER BY id;";
  let sql13 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Pattern Charges' ORDER BY id;";
  let sql14 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Accents' ORDER BY id;";
  let sql15 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Shower Seats' ORDER BY id;";
  let sql16 = "SELECT * FROM billing_part WHERE client_id=? AND program='tile' AND programTable='Add-Ons' ORDER BY id;";

  let sqlString = sql1.concat(sql2, sql3, sql4, sql5, sql6, sql7, sql8, sql9, sql10, sql11, sql12, sql13, sql14, sql15, sql16);

  let params = Array(16).fill(request.params.clientId);

  connection.query(sqlString, params, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.get('/wood-program', async(request, response) => {
  let sql1 = "SELECT * FROM billing_part WHERE client_id=? AND program='wood' AND programTable='Wood Flooring' ORDER BY id;";
  let sql2 = "SELECT * FROM billing_part WHERE client_id=? AND program='wood' AND programTable='Underlayment' ORDER BY id;";

  let sqlString = sql1.concat(sql2);

  let params = Array(2).fill(request.params.clientId);

  connection.query(sqlString, params, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});


router.get('/carpet-program', async(request, response) => {
  let sql1 = "SELECT * FROM billing_part WHERE client_id=? AND program='carpet' AND programTable='Carpet Flooring' ORDER BY id;";
  let sql2 = "SELECT * FROM billing_part WHERE client_id=? AND program='carpet' AND programTable='Carpet Pad' ORDER BY id;";

  let sqlString = sql1.concat(sql2);

  let params = Array(2).fill(request.params.clientId);

  connection.query(sqlString, params, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});


router.get('/vinyl-program', async(request, response) => {
  let sql1 = "SELECT * FROM billing_part WHERE client_id=? AND program='vinyl' AND programTable='Vinyl Plank' ORDER BY id;";
  let sql2 = "SELECT * FROM billing_part WHERE client_id=? AND program='vinyl' AND programTable='Vinyl Sheet' ORDER BY id;";

  let sqlString = sql1.concat(sql2);

  let params = Array(2).fill(request.params.clientId);

  connection.query(sqlString, params, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});


router.get('/countertops-program', async(request, response) => {
  let sql1 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Edges' ORDER BY id;";
  let sql2 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Sinks/Shape' ORDER BY id;";
  let sql3 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 1' ORDER BY id;";
  let sql4 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 2' ORDER BY id;";
  let sql5 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 3' ORDER BY id;";
  let sql6 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 4' ORDER BY id;";
  let sql7 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 5' ORDER BY id;";
  let sql8 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 6' ORDER BY id;";
  let sql9 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 7' ORDER BY id;";
  let sql10 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 8' ORDER BY id;";
  let sql11 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 9' ORDER BY id;";
  let sql12 = "SELECT * FROM billing_part WHERE client_id=? AND program='countertops' AND programTable='Level 10' ORDER BY id;";

  let sqlString = sql1.concat(sql2,sql3, sql4, sql5, sql6, sql7, sql8, sql9, sql10, sql11, sql12);

  let params = Array(12).fill(request.params.clientId);

  connection.query(sqlString, params, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.post('/', async(request, response) => {
  let sql = "INSERT INTO billing_part SET ? ON DUPLICATE KEY UPDATE ?;";

  connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

router.delete('/:id', async(request, response) => {
  let sql = "DELETE FROM billing_part WHERE id=?";

  connection.query(sql, [ request.params.id ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
}); 

module.exports = router;