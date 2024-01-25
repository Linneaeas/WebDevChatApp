const io = require("socket.io")(3000); //Creating a server on port 3000

io.on("connection", (socket) => {
  socket.emit("chat-message", "Hello World");
}); //Everytime someone connects to our server, it's gonna call this function and give each user it's own socket and using the socket were sending a message down to the client with this event chat-message.
