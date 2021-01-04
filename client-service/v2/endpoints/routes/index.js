const express = require('express');
const router = express.Router( );
const ClientXml = require('../../common/ClientXml');
const connection = require('../common/dbconfig');

// Default Response
router.get('/', async(req, res) => {
    res.send("This is MC Surfaces - Sage API.");
});

// Get finalized clients 
router.get('/completed-clients', async(request, response) => {
  let sql = "SELECT " + 
  "* FROM client " +
  "JOIN employee ON client.empnum = employee.recnum " +
  "JOIN contact ON client.id = contact.clientId " +  
  "WHERE client.done = 0 AND client.completed = 1; " +
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

router.use('/employee', require('./employeeRouter'));

module.exports = router;