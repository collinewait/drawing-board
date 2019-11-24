import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

function subscribeToDrawings(cb) {
  socket.on('drawing', cb);
  socket.emit('subscribeToDrawings');
}

function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

export { createDrawing, subscribeToDrawings};
