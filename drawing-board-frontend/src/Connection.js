import React, { useState, useLayoutEffect } from 'react';
import { subscribeToConnectionEvent } from './api';

const Connection = () => {
  const [connection, setConnectionState] = useState({
    status: 'connecting',
    port: null,
  });

  useLayoutEffect(() => {
    subscribeToConnectionEvent(connectObj => {
      setConnectionState(connectObj);
    });
  }, []);

  let content = null;

  if (connection.status === 'disconnected') {
    content = (
      <div className="Connection-error">
        We've lost connection to our server
      </div>
    );
  }
  if (connection.status === 'connecting') {
    content = <div>Connecting...</div>;
  }
  return (
    <div>
      <div className="Connection-port">Socket port: {connection.port}</div>
      {content}
    </div>
  );
};
export default Connection;
