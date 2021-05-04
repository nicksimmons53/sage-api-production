require('dotenv').config( );

const express = require('express');
const router = express.Router( );

// Default Response
router.get('/', async(req, res) => {
    res.send("This is MC Surfaces - Sage API.");
});

router.use('/clients', require('./clientRouter'));

module.exports = router;
