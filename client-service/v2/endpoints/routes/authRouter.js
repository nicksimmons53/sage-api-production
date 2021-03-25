const express = require('express');
const router = express.Router( );
const axios = require('axios');

require('dotenv').config( );

// Auth0 Options
const ManagementClient = require('auth0').ManagementClient;
const AuthenticationClient = require('auth0').AuthenticationClient;

router.post('/', async(req, res) => {
    let management = new ManagementClient({
        domain: 'dev-hfkkr2g4.auth0.com',
        clientId: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        scope: 'read:users update:users'
    });

    management.getUser('auth0|60347bf7dccb6e0070aeb58f')
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router;