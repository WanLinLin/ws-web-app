const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let connectionCount = 0;

const broadcast = (data) =>
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, error => {
        if (typeof error === 'undefined') {
          // the send has been completed
        } else {
          // error QQ
        }
      });
    }
  });

wss.on('connection', (ws, _request) => {
  broadcast(++connectionCount);

  ws.on('close', () => {
    broadcast(--connectionCount);
  });
});