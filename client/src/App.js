import React, { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "./providers/SocketProvider";

function App() {
  const [response, setResponse] = useState("");
  const [ chatBox, setChatBox ] = useState(new Date() + "from client")
  const [ image, setImage ] = useState("https://res.cloudinary.com/danleaver/image/upload/v1602112179/dpl_review/ebuen-clemente-jr-H5Iw3Xz0vxM-unsplash_ylu9xx.jpg")
  const preview = useRef();
  const videoRef = useRef();
  const { socket } = useContext(SocketContext);
  
  useEffect(() => {
    socket.on("newclientconnect", data => {
      console.log(data.description)
    });
    socket.on("stream", imagestream => {
      setImage(imagestream);
    });
    socket.on("message", data => {
      console.log("new msg: ", data)
      setResponse(data)
    })
    socket.send("FUCKIT")
    
    const startCamera = () => {
      const canvas = preview.current
      const context = canvas.getContext('2d')
      canvas.width = 140
      canvas.height = 100
      context.width = canvas.width;
      context.height = canvas.height;  
      const video = videoRef.current
 
      function loadCamera(stream){
        try { video.srcObject = stream } 
        catch (error) {
         video.src = URL.createObjectURL(stream);
        }
         console.log("Camera connected");
      }
  
      function loadFail() {console.log("Camera not connected")};
      
      function Draw(video,context){
          context.drawImage(video,0,0,context.width,context.height);
          // socket.emit('stream',canvas.toDataURL('image/webp'));
          socket.emit('stream',canvas.toDataURL('image/jpg, 0.01'));
      }

      navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia );
      // navigator.getUserMedia = ( navigator.getUserMedia );

  
      if (navigator.getUserMedia) {
        navigator.getUserMedia({
            video: true, 
            audio: false,
        },loadCamera,loadFail);
      } else console.log("navigator failed!!");

      setInterval(function(){
          Draw(video,context);
      // },0.1);
      },1000);
    }

    startCamera()
    
    return () => socket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.send(chatBox)
  }

  return (
    <>
      <canvas
       style={{display:"none"}} 
       ref={preview}
      >
      </canvas>
      <video src="" ref={videoRef} style={{width:"50%", height: "50%"}} autoplay="true"></video>
      <div>
      <img style={{border:"1px solid red"}} src={image} />
      </div>
      {/* <img src="https://res.cloudinary.com/danleaver/image/upload/v1602112179/dpl_review/ebuen-clemente-jr-H5Iw3Xz0vxM-unsplash_ylu9xx.jpg" /> */}
      
      <p>
         &nbsp;&nbsp;&nbsp;&nbsp; Incoming: <time dateTime={response}>{response}</time>
      </p>
      <form onSubmit={handleSubmit}>
        <input autoComplete="off" value={chatBox} onChange={(e)=>setChatBox(e.target.value)}/>
        <button>Send</button>
      </form>
    </>
  );
}

export default App;