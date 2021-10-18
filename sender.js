const io = require("socket.io-client");
const prompt = require('prompt-sync')();

const socket = io("http://localhost:3000");
let userName = null;
  
socket.on("connect", () => {
    console.log("printing client instance socket Id: ", socket.id);
    socket.emit("newUser", {userName: "user1"});
    // have to emit message as below when user is sending a message to another user
    socket.emit("sendMessage", {sender: "user1", receiver: "user2", message: "test"});
});

socket.on("disconnect", () => {
    socket.emit("disconnect", {userName})
});