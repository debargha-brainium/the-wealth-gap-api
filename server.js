const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const env = require('./env');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');

const config = global.config = require('./config')[env.mode || 'development'];

const PORT = config.port.http || 3200;
const NODE_ENV = env.mode || 'development';
app.set('port', PORT);
app.set('env', NODE_ENV);

const server = http.createServer(app);

const httpsConfig = {
    key: fs.readFileSync(config.https.key, 'utf8'),
    cert: fs.readFileSync(config.https.cert, 'utf8'),
};

if (config.https.passphrase)
    httpsConfig.passphrase = config.https.passphrase;

const httpsServer = https.createServer(httpsConfig, app);

app.set('secret', config.auth.secret);

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public/uploads/'));
app.use('/assets/images', express.static(__dirname + '/assets/images/'));
app.use('/assets/css', express.static(__dirname + '/assets/css/'));
app.use('/display-picture', express.static(__dirname + '/public/uploads/display-picture/'));
// app.use('/category', express.static(__dirname + '/public/uploads/category'));



module.exports = app;

app.use(cors());

module.exports.httpServer = server.listen(PORT, () => {
    console.log(`HTTP Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
});

module.exports.httpsServer = httpsServer.listen(config.port.https, () => {
    console.log('HTTPS Server running on port ' + config.port.https);
});

var {router} = require('./system');

app.use(router.createRouterFromJson(require('./routes')));

global.appRoot = __dirname;
global.appPort = PORT;

require('./system/chat');