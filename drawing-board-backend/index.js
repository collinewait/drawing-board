const {
  createDrawing,
  subscribeToDrawings,
  handleLinePublish,
  subscribeToDrawingLines,
  getDBConnection,
} = require('./db');

const io = require('socket.io')();

getDBConnection().then(connection => {
  io.on('connection', client => {
    client.on('createDrawing', ({ name }) => {
      createDrawing({ connection, name });
    });

    client.on('subscribeToDrawings', () =>
      subscribeToDrawings({ client, connection }),
    );

    client.on('publishLine', line =>
      handleLinePublish({
        line,
        connection,
      }),
    );

    client.on('subscribeToDrawingLines', ({ drawingId, from }) => {
      subscribeToDrawingLines({ client, connection, drawingId, from });
    });
  });
});

const port = parseInt(process.argv[2], 10) || 8000;
io.listen(port);
console.log('listening on port ', port);
