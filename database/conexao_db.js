//db.js
const mysql = require('mysql2/promise');
async function connect(){

    if(global.connection && global.connection.state !== 'disconnected') 
        return global.connection;

    const connectionString = process.env.CONNECTION_STRING;
    const connection = await mysql.createConnection(connectionString);

    console.log('Conectou no MySQL!');
    global.connection = connection;
    return global.connection;
}
connect();

module.exports = {
    connect
}
