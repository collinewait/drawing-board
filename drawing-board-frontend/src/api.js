import openSocket from 'socket.io-client';
import { fromEventPattern } from 'rxjs';
import { bufferTime, map, scan, withLatestFrom } from 'rxjs/operators';

const port = parseInt(window.location.search.replace('?', '')) || 8000; // this is a hack only for the demo. don't do it in real life
//const socket = openSocket(process.env.REACT_APP_SERVER_URL);
const socket = openSocket(process.env.REACT_APP_SERVER_URL + port);

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

  const reconnectStream = fromEventPattern(
    h => socket.on('connect', h),
    h => socket.off('connect', h),
  );

  // get the latest timestamp
  const maxStream = lineStream.pipe(
    map(l => new Date(l.timestamp).getTime()),
    scan((a, b) => Math.max(a, b), 0),
  );

  reconnectStream.pipe(withLatestFrom(maxStream)).subscribe(joined => {
    const lastReceivedTimestamp = joined[1];
    socket.emit('subscribeToDrawingLines', {
      drawingId,
      from: lastReceivedTimestamp,
    });
  });

  bufferedTimeStream.subscribe(linesEvent => cb(linesEvent));
  socket.emit('subscribeToDrawingLines', { drawingId });
}

function subscribeToConnectionEvent(cb) {
  socket.on('connect', () =>
    cb({
      status: 'connected',
      port,
    }),
  );

  socket.on('disconnect', () =>
    cb({
      status: 'disconnected',
      port,
    }),
  );

  socket.on('connect_error', () =>
    cb({
      status: 'disconnected',
      port,
    }),
  );
}

export {
  createDrawing,
  subscribeToDrawings,
  publishLine,
  subscribeToDrawingLines,
  subscribeToConnectionEvent,
};
