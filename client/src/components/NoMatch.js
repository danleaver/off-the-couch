import React, { useEffect, useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";

const NoMatch = () => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.send("Not Watching")
  },[])

  return "WRONG WAY, BUD"
}

export default NoMatch