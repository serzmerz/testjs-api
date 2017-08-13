const express = require('express');

const user = require('./user');
const auth = require('./auth');
const order = require('./order');

const router = new express.Router();

router.use('/user', user);
router.use('/auth', auth);
router.use('/order', order);

router.get('/status', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;
