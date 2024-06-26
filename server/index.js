const express = require('express');
const path = require('path');

const app = express();
const {spawn} = require('child_process');
const WebSocket = require('ws');

const fs = require('fs');


const http = require('http');

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

const publicPath = path.join(__dirname, '..', 'client');
app.use(express.static(publicPath, { index: 'index.html' }));

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'test.html'));
    
})

const PORT = process.env.PORT || 3000;
const httpServer = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', function connection(ws) {
    console.log('WebSocket connection established');

    ws.on('message', function incoming(message) {
        // Process the received video data
        // Here you can perform any desired operations with the video data
        // console.log('Received video data:', message);
        // MESSAGE IS BASE 64 ENCODED JPEG
        message = message.toString();
        console.log(message+"\n\n\n");
        // const buffer = Buffer.from(message.Body).toString('base64');        
        
        // const imageData = message.replace(/^data:image\/jpeg;base64,/, '');
        // const mimeType = 'image/jpg'; 
        
        // console.log("Image Saved");
        // fs.writeFileSync('received_image.jpg', buffer);

        // Example: Sending a response back to the client
        var dataToSend;
        const python = spawn('python', ['test.py']);
        python.stdout.on('data', function (data) {
            // console.log('Pipe data from python script ...');
            dataToSend = data.toString();
        });    
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            // send data to browser
            // res.send(dataToSend)
        });
        const response = 'Server received your video data';
        ws.send(response);
    });

    ws.on('close', function() {
        console.log('WebSocket connection closed');
    });
});

