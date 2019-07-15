const express = require('express');
const account = require('./accounts/accountRoutes');

const server = express();

server.use(express.json());
server.use('/api/accounts', account);

module.exports = server;