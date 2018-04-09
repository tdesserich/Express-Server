const express = require('express');
const app = express();

const http = require('http').Server(app);

http.listen(3000, ( ) => {
    console.log('server is on port 3000');
});