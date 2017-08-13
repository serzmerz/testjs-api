const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');

const port = process.env.port;
const server = express();

server.set('trust proxy', true);
server.disable('x-powered-by');

server.use((req, res, next) => {
    req.lang = 'ru';
    req.config = config.get();

    next();
});

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

server.use('/', require('./1.0'));

server.use((error, req, res, next) => {
    const env = config.get('env');

    if (error) {
        if (env === 'local' || env === 'development') {
            res
                .status(503)
                .header('Content-Type', 'text/html; charset=utf-8')
                .send(`<pre>${error}</pre>`);
        } else {
            res.status(520).end();
        }
    }
    next();
});

server.listen(port, () => {
    console.log('The server is running at port ' + port); // eslint-disable-line no-console
});

