const express = require('express');
const AuthRouter = new express.Router();

const serialize = require('../middlewares/auth/serialize/serializeUser');
const generateAccessToken = require('../middlewares/auth/token/generateAccessToken');
const respond = require('../middlewares/auth/respond/respondAuth');
const passport = require('../auth');

AuthRouter.post('/', passport.initialize(), passport.authenticate(
    'local', {
        session: false
    }), serialize, generateAccessToken, respond);

AuthRouter.post('/signup', passport.authenticate('signup', {
    session: false
}), function(req, res) {
    res.status(200).json(req.user);
});

module.exports = AuthRouter;
