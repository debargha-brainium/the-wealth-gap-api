var { httpServer, httpsServer } = require('../server');
var socketio = require('socket.io');
var io = socketio(httpServer);
io.attach(httpServer, global.config.socket);
io.attach(httpsServer, global.config.socket);

var jwt = require('jsonwebtoken');

//TODO: use redis to store/retrieve user connections
var users = {};
// var admins = {};

io.use(function (socket, next) {
    // console.log(socket.handshake.query)
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                //console.log('token mismatch');
                return next(new Error('Access Denied'));
            }
            console.log(decoded);
            socket.decoded = decoded;
            next();
        });
    } else {
        console.log('no token');
        next(new Error('Access Denied'));
    }
});
io.on('connection', (socket) => {
    // console.log('id',socket.id);
    let user_id = socket.decoded.userid;
    // console.log(user_id)
    // try {
    //     let role = Buffer.from(socket.decoded.sub2, 'base64').toString('ascii');
    //     if (role == 'ADMIN') {
    //         admins[user_id] = socket.id;
    //         console.log('admin')
    //     }
    // } catch (e) { }
    users[user_id] = socket.id;
    socket.emit('connected', 'Welcome');
    socket.on('disconnect', () => {
        delete users[user_id];
        // if (admins[user_id]) delete admins[user_id];
    });
});
console.log('socket is listening..');
global.sendToClient = (client_id, send_type, data) => {
    if (!users[client_id]) return false;
    return io.to(users[client_id]).emit(send_type, data);
}
global.getActiveAdmin = () => {
    let keys = Object.keys(admins);
    return keys.length ? keys[0] : null;
}
/*global.sendToRoom=(room, send_type, data)=>{
    return io.to(room).emit(send_type,data);
}*/