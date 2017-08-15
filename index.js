const express = require('express');
const logger = require('logops');
const expressLogging = require('express-logging');
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.argv[3] || 3000;


app.use(expressLogging(logger));

app.use(express.static(__dirname + "/client"));

io.on('connection', (socket) => {

  socket.on('stream', (image) => {
    socket.broadcast.emit('stream', image);
  });
});

http.listen(PORT, () => {
  logger.info(`App listen on port ${ PORT }`);
});
