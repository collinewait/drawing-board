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

function subscribeToDrawings({ client, connection }) {
  r.table('drawings')
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((err, drawingRow) =>
        client.emit('drawing', drawingRow.new_val),
      );
    });
}

function handleLinePublish({ connection, line }) {
  console.log('Saving line to the db');
  r.table('lines')
    .insert(Object.assign(line, { timestamp: new Date() }))
    .run(connection);
}

function subscribeToDrawingLines({ client, connection, drawingId, from }) {
  let query = r.row('drawingId').eq(drawingId);

  if (from) {
    query = query.and(r.row('timestamp').ge(new Date(from)));
  }

  return r
    .table('lines')
    .filter(query)
    .changes({ include_initial: true })
    .run(connection)
    .then(cursor => {
      cursor.each((err, lineRow) =>
        client.emit(`drawingLine:${drawingId}`, lineRow.new_val),
      );
    });
}

function getDBConnection() {
  return r.connect({
    host: 'localhost',
    port: 28015,
    db: 'drawing_board',
  });
}

module.exports = {
  createDrawing,
  subscribeToDrawings,
  handleLinePublish,
  subscribeToDrawingLines,
  getDBConnection,
};
