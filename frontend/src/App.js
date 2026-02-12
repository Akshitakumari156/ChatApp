import React, { useEffect,useState } from 'react'
import io from 'socket.io-client';
import './App.css';
function App() {
  const [socket,setSocket]=useState(null);

   const [message,setMessage]=useState("");
   const [RoomName,setRoomName]=useState("");

   const[socketId,setSocketId]=useState("");
   
   const [allMsg,setAllMsg]=useState([]);

  useEffect(()=>{
    const socket=io("http://localhost:3002");
    
    // socket.on("forAllMsg",(akshita)=>{
    //   console.log(akshita);
    // })

    socket.on("personal-msg",(m)=>{
      setAllMsg(prev=>[...prev,m]);
      console.log(m);
    })
    
    socket.on("mereLiyeNahi",(m)=>{
      console.log(m);
    })

    socket.on("connect",()=>{
      console.log("User connected");
      setSocket(socket);
    })
    
    // socket.on("foronlyme",(m)=>{
    //   console.log(m);
    // })

    return()=>{
      socket.disconnect();
    }
   
  },[]);

  const handlerSubmit=(e)=>{
    e.preventDefault();
    socket.emit("send-message",{msg:message,id:socketId});
    setMessage("");
    setSocketId("");
  }

  const roomJoinHandler=(e)=>{
    e.preventDefault();
    socket.emit("join-room",RoomName);
    setRoomName("");
  }

  return (
    <div>
      <h2>Socket Chat App</h2>

      {/* personal chat form*/}
      <form onSubmit={handlerSubmit}>
        {
          socket?.id
        }
        <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Type your message here' />
        <input type='text' value={socketId} onChange={(e)=>{setSocketId(e.target.value)}} placeholder='enter socketId'/>
        <button type='submit'>Send</button>
        {
          allMsg.map((msg,index)=>{
            return <p key={index}>{msg}</p>
          })
        }
      </form>

      {/* Room wala form */}
      <form onSubmit={roomJoinHandler}>
        <input type="text" value={RoomName} onChange={(e)=>setRoomName(e.target.value)} placeholder='Enter Room Name' />
        <button type='submit'>Join Room</button>
      </form>

    </div>
  )
}

export default App
