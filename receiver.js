const io = require("socket.io-client");
const prompt = require('prompt-sync')();

const socket = io("http://localhost:3000");
let userName = null;
  
socket.on("connect", () => {
    console.log("printing client instance socket Id: ", socket.id);
    //once user logs in, username is passed to the server to update the user-socket mapping
    socket.emit("newUser", {userName: "user2"});
});

socket.on("private message", data => {
    //what action has to be taken when user recieves a message from another user
    console.log("received private message", data);
})

socket.on("disconnect", () => {
    console.log("disconnected from socket server");
    socket.emit("disconnect", {userName})
});