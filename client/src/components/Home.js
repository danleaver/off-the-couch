import React, { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";
import Camera from "./Camera";

function Home() {
  const [ clientStatus, setClientStatus ] = useState(null)
  const [ showWebCam, setShowWebCam, ] = useState(false)
  const { socket } = useContext(SocketContext);
  
  useEffect(() => {
    socket.on("newclientconnect", data => {
      console.log(data.description)
      setClientStatus(data.description)
    });
    socket.on("message", data => {
      if (data === "Not Watching") {
        setClientStatus("someone has disconnected!")
      }
    })
        
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (clientStatus === "someone new has joined!") {
      setShowWebCam(true)
    } else if (clientStatus === "someone has disconnected!") {
      setShowWebCam(false)
    }
  }, [clientStatus])

  return (
    <>
     {showWebCam && <Camera/>}
    </>
  );
}

export default Home;