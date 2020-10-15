import React, {useEffect, useContext, useState} from 'react';
import { SocketContext } from "../providers/SocketProvider";


const Watch = () => {
  const { socket } = useContext(SocketContext);
  const [ image, setImage ] = useState("https://res.cloudinary.com/danleaver/image/upload/v1602112179/dpl_review/ebuen-clemente-jr-H5Iw3Xz0vxM-unsplash_ylu9xx.jpg")

  useEffect(()=>{
    socket.on("stream", imagestream => {
      setImage(imagestream);
    });
  }, [])

  return (
    <div>
      <img style={{border:"1px solid red"}} src={image} />
    </div>
  )
}

export default Watch