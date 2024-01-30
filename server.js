const io = require("socket.io")(3000, {
  cors: {
    origin: "http://192.168.0.12:5500",
    methods: ["GET", "POST"],
  },
}); //Added to solve cors error

const users = {}; // Creating users as an empty object(that will get the id of the individuals socket)

io.on("connection", (socket) => {
  //socket.emit("chat-message", "Hello World");
  //Everytime someone connects to our server it's gonna call the socket.emit function and give each user it's own socket and using that socket were sending a message down to the client with this event chat-message.
  socket.on("new-user", (name) => {
    users[socket.id] = name; //Using the users socket id to become the object user, which will be the users name
    socket.broadcast.emit("user-connected", name); // Message to the existing members that someone joined.
  });

  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    }); //Create an function so our server knows how to handle what has been sent from the client. socket.broadcast.emit sending the message to every single person who is connected to that server except the person who sent the message.
  });
  socket.on("disconnect", (name) => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
