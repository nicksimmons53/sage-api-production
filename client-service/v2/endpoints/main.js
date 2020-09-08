// Imported Modules
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express( );

app.use(bodyParser.json({ strict: false }));

app.use('/v2/', require('./routes/index'));

module.exports.handler = serverless(app);