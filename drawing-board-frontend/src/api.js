import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

export { createDrawing };
