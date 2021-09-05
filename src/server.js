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
    // res.render('index', { title: 'Hey', message: 'Hello there!' })
    return res.status(200).sendFile(`${__dirname}/client.html`);
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
// server.listen(3000, () =>{
//   console.log('http://localhost:3000')
// });



// const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');

// app.get('/', (req, res) => {
//     return res.status(200).sendFile(`${__dirname}/client.html`);
// });

// // const server = app.listen(3000);

new hls(app.listen(3000), {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
});