const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
const port=3002;
const http=require("http");
const server=http.createServer(app);
const SocketIO=require("socket.io");

const io=new SocketIO.Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credential:true
    }
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);
    socket.emit("forAllMsg",`${socket.id} joined the  Socket Chat App`);
});

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});