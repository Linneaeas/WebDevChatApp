const socket = io("http://localhost:3000"); //Create socket variable and location where the server hosting the socket.

socket.on("chat-message", (data) => {
  console.log(data);
}); //Whenever we recieve an event calling a function with the data that we sent down from the server.
