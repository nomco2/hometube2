import http from 'http';
import express from 'express';
import WebSocket from 'ws';
// const express = require('express');

const app = express();

//middleware
app.set('view engine', 'pug');
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + "/public"));
//router
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  });

  

// server app
// app.listen(3000, () => {
//     console.log('Listening on http://localhost:3000')
// });
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) =>{
  console.log(socket);
})
server.listen(3000, () =>{
  console.log('http://localhost:3000')
});
