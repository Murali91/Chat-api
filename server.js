const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server);

const userToSocketId = {};
io.on("connection", (socket) => {
    console.log("established socket connection");
    console.log("socker server instance Id", socket.id);
    socket.on("newUser", data => {
        //evertime a new user is connected to the user, we need to update the user-socket mapping
        userToSocketId[data.userName] = socket.id;
        //TODO - check if user has any unread messages till now

    });
    socket.on("sendMessage", data => {
        let receiverSocketId = userToSocketId[data.receiver];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("private message", data.message);
        } else {
            //TODO - persist the message as unread against the userId
        }
        //TODO - persists the message to Db => senderId | receiverId | message
    });
    socket.on("disconnect", (data => {
        //when user disconnects, remove the socketId from mapping
        delete userToSocketId[data.userName];
    }));
});


app.get('/messages', (req, res) => {

    res.send("success")
});

server.listen(3000);