const passport = require('passport');
const Strategy = require('passport-local');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const isValidPassword = function(user, password) {
    password = crypto.createHmac('sha256', password)
        .update('hack this please')
        .digest('hex');
    return password === user.password;
};

passport.use(new Strategy(
    function(username, password, done) {
        User.findOne({ where: { username } }).then(user => {
            if (! user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            if (! isValidPassword(user, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        }).catch(function(err) {
            console.log('Error:', err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }));

const createHash = function(password) {
    return crypto.createHmac('sha256', password)
        .update('hack this please')
        .digest('hex');
};

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function(req, username, password, done) {
        const findOrCreateUser = function() {
            User.findOne({ where: { username } }).then(user => {
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false, { message: 'User Already Exists' });
                }
                User.create({ username, password: createHash(password) }).then(data => {
                    console.log('User Registration successful!');
                    return done(null, data);
                })
                    .catch(err => {
                        console.log('Error in Saving user: ' + err);
                        return done(err);
                    });
            }).catch(function(err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            });
        };

        process.nextTick(findOrCreateUser);
    })
);

module.exports = passport;
