import React from 'react';
import { useEffect } from 'react';
import socketIOClient from "socket.io-client";

export const SocketContext = React.createContext();

const SocketProvider = (props) => {
  // const ENDPOINT = "http://10.0.0.193:4001";
  const ENDPOINT = "/"
  const socket = socketIOClient(ENDPOINT);

  return(
    <SocketContext.Provider value={{
      socket
    }}>
      { props.children }
    </SocketContext.Provider>
    
  )

}

export default SocketProvider