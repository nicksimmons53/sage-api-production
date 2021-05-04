// Imported Modules
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express( );

app.use(bodyParser.json({ strict: false }));

app.use(cors( ));

app.use('/v3/', require('./routes/index'));

module.exports.handler = serverless(app);