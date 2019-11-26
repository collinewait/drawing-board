# drawing-board

This application demonstrates real time programming with [react](https://reactjs.org/), [socket io](https://socket.io/), [RethinkDB](https://rethinkdb.com/) and [RxJS](https://rxjs-dev.firebaseapp.com/).

React is used as the view layer.

Socket io is used to  send events to and from the server and the client.

RethinkDb is used to store coordinates of what the user draws on a white board. It has the concept of live queries, meaning you can open up a query to the db and it will notify you if the value has changed or any new values matching the query are saved to the db. We are to use the live query functionality to allow us to scale our sockets out over multiple servers; to subscribe to a drawing from one socket server while a user's drawing changes are saved through another websocket server.

RxJS is used to deal with streams.
