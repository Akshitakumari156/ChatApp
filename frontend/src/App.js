import React, { useEffect } from 'react'
import io from 'socket.io-client';
function App() {
  useEffect(()=>{
    const socket=io("http://localhost:3002");
    
    socket.on("forAllMsg",(akshita)=>{
      console.log(akshita);
    })

    socket.on("connect",()=>{
      console.log("Connected to server with ID:",socket.id);
    })

   
  },[]);
  return (
    <div>

      <h2>Socket Chat App</h2>
    </div>
  )
}

export default App
