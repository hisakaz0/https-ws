
const WebSocket = require('ws');
const express = require('express');

const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
});

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log(`recieved: ${msg}`);
  });

  ws.send('This is server');
});

const app = express();
app.get('/', (req, res) => {
  Array.from(wss.clients).forEach(ws => {
    ws.send("Access from http");
  });
  res.send({ res: 'ok' });
});

app.listen(8081, () => console.log("express is started"));

console.log("Info: start server");
