const io = require('socket.io')();
const r = require('rethinkdb');

function createDrawing({ connection, name }) {
  r.table('drawings')
    .insert({
      name,
      timestamp: new Date(),
    })
    .run(connection)
    .then(() => console.log('created a drawing with name: ', name));
}

r.connect({
  host: 'localhost',
  port: 28015,
  db: 'drawing_board',
}).then(connection => {
  io.on('connection', client => {
    client.on('createDrawing', ({ name }) => {
      createDrawing({ connection, name });
    });
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
