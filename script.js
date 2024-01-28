const socket = io("http://localhost:3000"); //Create socket variable and location where the server hosting the socket.
const messageContainer = document.getElementById("message-container"); //Creating/connecting our message container
const messageForm = document.getElementById("send-container"); //Creating/connecting our form
const messageInput = document.getElementById("message-input"); //Creating/connecting message input

const name = prompt("What is your name?"); //Alert to get the users name
appendMessage("You joined"); //Showing when a name is typed in and user has joined
socket.emit("new-user", name); //Sending the new user to the server

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}:/ ${data.message}`);
}); //Calling the function appendMessage when a user sends a chat message, also including the users name.

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`); // Calling the function appendMessage when a user is connected
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`); // Calling the function appendMessage when a user disconnect
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault(); //Whenever we submit our form, we wanna stop the form to submitting so the page dont refresh(in that case we would loose all our chatmessages)
  const message = messageInput.value; //Getting the value from the message input
  appendMessage(`You:/ ${message}`); //Include the users own messages
  socket.emit("send-chat-message", message); //Send information from the client to the server
  messageInput.value = ""; //Clear input field.
});

/*ORIGINAL FUNCTIONALITY
 function appendMessage(message) {
  //Append message to our index file
  const messageElement = document.createElement("div"); //Create a messageElement
  messageElement.innerText = message; //Setting the value of the text
  messageContainer.append(messageElement); //Adding the message to the messageContainer} */

//Functionality & classes for styling
function appendMessage(message) {
  const messageElement = document.createElement("div");

  // Create a span element to wrap the name
  const nameSpan = document.createElement("span");
  nameSpan.classList.add("message-name"); // Add a class for styling
  nameSpan.innerText = message.split("/")[0]; // Assuming the name is before the colon

  // Create a span element to wrap the message content
  const contentSpan = document.createElement("span");
  contentSpan.innerText = message.split("/").slice(1).join("/").trim(); // Get the message content after the colon

  // Append the name and content spans to the message element
  messageElement.appendChild(nameSpan);
  messageElement.appendChild(document.createTextNode(" ")); // Add a space
  messageElement.appendChild(contentSpan);

  // Add the message element to the message container
  messageContainer.appendChild(messageElement);
}
