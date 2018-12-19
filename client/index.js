

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080/', {
  perMessageDeflate: false
});

ws.on('open', () => {
  ws.send('client opend');
});

ws.on('message', (data) => {
  console.log(`recieved data: ${data}`);
});

console.log("Info: start client");
