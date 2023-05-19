import React from 'react';
import useWebSocket from 'react-use-websocket';


function InitClient() {
  useWebSocket('ws://127.0.0.1:8000', {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <div>Hello WebSockets!</div>
  );
}

export default InitClient;