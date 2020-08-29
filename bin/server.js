// 'use strict' //Faz com que o JS seja criterioso com os códigos

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');


const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log('API OK ' + port)

//Normalizando as portas
function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

//Possíveis erros 
function onError(error) {
    if (error.syscall !== 'listen') {
        throw Error
    }

    const bind = typeof port === 'String' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

//Debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    debug('Listening on ' + bind);
} 