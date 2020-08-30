// Imported Modules
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mysql = require('mysql');
const moment = require('moment');
const ClientXml = require('../common/ClientXml');

// RDS Connection Info imported from serverless.yml
const connection = mysql.createConnection({
  host            : process.env.RDS_HOST,
  user            : process.env.RDS_USER,
  password        : process.env.RDS_PASSWORD,
  database        : process.env.RDS_DATABASE_NAME,
  port            : '3306',
  multipleStatements: true
});

const app = express( );
app.use(bodyParser.json({ strict: false }));

//
//
/*          READ FUNCTIONS          */
//
//
// Default Response
app.get('/', (req, res) => {
  res.send("Welcome to MC Surfaces - Sage API.");
});

// Retrieve all employees
app.get('/employee', async(request, response) => {
  let sql = "SELECT * FROM employee;";

  await connection.query(sql, (err, res) => {
    if (err) throw err;
    
    response.send(res);
  });
});

// Retrieve employee data by ID
app.get('/employee/:empId', async(request, response) => {
  let sql = "SELECT * FROM employee where recnum = ?;";

  await connection.query(sql, [ request.params.empId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve employee clients
app.get('/employee/:empId/clients', async(request, response) => {
  let sql = "SELECT * FROM client WHERE empnum = ?;";

  await connection.query(sql, [ request.params.empId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve a single client
app.get('/employee/:empId/clients/:clientId', async(request, response) => {
  let sql = "SELECT * FROM client WHERE empnum = ? and id = ?;";

  await connection.query(sql, [ request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve a client's addresses
app.get('/employee/:empId/clients/:clientId/address', async(request, response) => {
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

// Retrieve clients from backup table 
app.get('/backup_data/clients', async(request, response) => {
  let sql = "SELECT * FROM client_backup;";

  await connection.query(sql, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client contacts
app.get('/employee/:empId/clients/:clientId/contacts', async(request, response) => {
  let sql = "SELECT " +
   "contct, cntds1, phnnum, phnext, faxnum, cllphn, pagnum, e_mail, " +
   "contc2, cntds2, phn002, phext2, fax002, cell02, pagr02, email2, " +
   "contc3, cntds3, phn003, phext3, fax003, cell03, pagr03, email3 " +
   "FROM client " + 
   "WHERE empnum = ? AND id = ?;";

  await connection.query(sql, [ request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve all Client Contacts
app.get('/employee/:empId/clients/:clientId/client-contacts', async(request, response) => {
    let sql = "SELECT * FROM contact WHERE clientId=?";

    connection.query(sql, request.params.clientId, (err, res) => {
        if (err) throw err;

        response.send(res);
    })
});

// Retrive client advanced info
// TO BE REMOVED IN UPDATE 1.3
app.get('/employee/:empId/clients/:clientId/advInfo', async(request, response) => {
  let sql = "SELECT " + 
    "exmnum, pmtday, pmtfrq, atopay, invsbm, " +
    "invddl, pmttyp, chkpup, pmtprt, vndreq, " +
    "posreq, pohndl, aprvls, vndprt, wstfct, " +
    "pmturl, invpos, pohnem, strtdt, invema, " +
    "invadr, invcty, invste, invzip, jobrls, " +
    "jobema, vndusr, vndpss, homest, accema, " +
    "accphn, accnam " +
    "FROM client where empnum = ? and id = ?;";

  await connection.query(sql, [ request.params.empId, request.params.clientId ], (err, res) => {
      if (err) throw err;
  
      response.send(res);
  });
});

app.get('/employee/:empId/clients/:clientId/advanced-info', async(request, response) => {
  let sql = "SELECT * FROM client_info where client_id=?";

  await connection.query(sql, request.params.clientId, (err, res) => {
      if (err) throw err;
  
      response.send(res);
  });
});

// Retrieve client tile program
app.get('/employee/:empId/clients/:clientId/tileProgram', async(request, response) => {
  let sql = "SELECT * FROM tile_program WHERE client_id = ?;";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Retrieve client parts
app.get('/employee/:empId/clients/:clientId/parts/:programId', async(request, response) => {
  let sql = "SELECT * FROM part WHERE clntid = ? and prgrm_ = ?;";

  await connection.query(sql, [ request.params.clientId, request.params.programId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Get finalized clients 
app.get('/completed-clients', async(request, response) => {
  let sql = "SELECT * FROM client JOIN employee ON client.empnum = employee.recnum WHERE client.done = 0 AND client.completed = 1; " +
    "UPDATE client SET client.done = 1 WHERE client.completed = 1;";

  await connection.query(sql, (err, res) => {
    if (err) throw err;

    let xml = ClientXml.xml(res[0][0]);

    let result = {
      xmlString: xml,
      client: res[0][0],
      username: "nicks",
      userPass: "Nicks081219"
    };
    
    console.log(result);
    response.send(result);
  });
});


//
//
/*          CREATE FUNCTIONS          */
//
//
// Create employee
app.post('/employee', async(request, response) => {
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
app.post('/employee/login', async(request, response) => {
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

// Create client
app.post('/employee/:empId/clients', async(request, response) => {
  let sql = "INSERT INTO client SET ?;";

  await connection.query(sql, request.body, (err, res) => {
    if (err) throw err;

    response.status(201).send(res);
  });
});

app.post('/employee/:empId/clients/:clientId/parts', async(request, response) => {
  let sql = "INSERT INTO part SET ? ON DUPLICATE KEY UPDATE ?;";

  await connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

app.post('/employee/:empId/clients/:clientId/advanced-info', async(request, response) => {
  let sql = "INSERT INTO client_info SET ? ON DUPLICATE KEY UPDATE ?;";

  connection.query(sql, [ request.body, request.body ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

app.post('/employee/:empId/clients/:clientId/client-contacts', async(request, response) => {
    let sql = "INSERT INTO contact SET ?;";

    connection.query(sql, request.body, (err, res) => {
        if (err) throw err;

        response.send(res);
    });
});

// Retrieve client tile program
app.post('/employee/:empId/clients/:clientId/tileProgram', async(request, response) => {
    let sql = "INSERT INTO tile_program SET ? ON DUPLICATE KEY UPDATE ?;";
  
    await connection.query(sql, [ request.body, request.body ], (err, res) => {
      if (err) throw err;
  
      response.send(res);
    });
  });

//
//
/*          UPDATE FUNCTIONS          */
//
//
// Create client contact
app.put('/employee/:empId/clients/:clientId/contacts', async(request, response) => {
  let sql = "UPDATE client SET ? WHERE empnum = ? AND id = ?;";

  await connection.query(sql, [ request.body, request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.status(201).send(res);
  });
});

// Update Client Info
app.put('/employee/:empId/clients/:clientId', async(request, response) => {
  let sql = "UPDATE client SET ? WHERE empnum = ? AND id = ?;";

  await connection.query(sql, [ request.body, request.params.empId, request.params.clientId ], (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

//
//
/*          DELETE FUNCTIONS          */
//
//
// Get all clients
app.delete('/employee/:empId/clients/:clientId/client-contacts/:contactID', async(request, response) => {
    let sql = "DELETE FROM contact WHERE id=?;";

    await connection.query(sql, request.params.contactID, (err, res) => {
        if (err) throw err;

        console.log(request);

        response.send(res);
    });
});

//
//
/*          ADMIN FUNCTIONS          */
//
//
// Get all clients
app.get('/admin/clients', async(request, response) => {
  let sql = "SELECT * from client;";

  await connection.query(sql, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

// Advance client
app.put('/admin/clients/:clientId', async(request, response) => {
  let sql = "UPDATE client SET completed = 1 WHERE id = ?;";

  await connection.query(sql, request.params.clientId, (err, res) => {
    if (err) throw err;

    response.send(res);
  });
});

module.exports.handler = serverless(app);