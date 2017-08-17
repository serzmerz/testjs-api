const express = require('express');

const order = require('./order');

const router = new express.Router();

router.use('/order', order);

router.get('/status', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;
