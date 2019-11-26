import openSocket from 'socket.io-client';
import { fromEventPattern } from 'rxjs';
import { bufferTime, map } from 'rxjs/operators';

const socket = openSocket(process.env.REACT_APP_SERVER_URL);

function subscribeToDrawings(cb) {
  socket.on('drawing', cb);
  socket.emit('subscribeToDrawings');
}

function createDrawing(name) {
  socket.emit('createDrawing', { name });
}

function publishLine({ drawingId, line }) {
  socket.emit('publishLine', { drawingId, ...line });
}

function subscribeToDrawingLines(drawingId, cb) {
  const lineStream = fromEventPattern(
    h => socket.on(`drawingLine:${drawingId}`, h),
    h => socket.off(`drawingLine:${drawingId}`, h),
  );

  const bufferedTimeStream = lineStream.pipe(
    bufferTime(100),
    map(lines => ({ lines })),
  );
  bufferedTimeStream.subscribe(linesEvent => cb(linesEvent));

  socket.emit('subscribeToDrawingLines', drawingId);
}

export {
  createDrawing,
  subscribeToDrawings,
  publishLine,
  subscribeToDrawingLines,
};
