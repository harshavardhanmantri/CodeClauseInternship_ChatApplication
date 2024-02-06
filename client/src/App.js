import "./App.css";
import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io.connect("http://localhost:3003");
function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [array, setArray] = useState([]);
  const [valid, setValid] = useState(true);
  const [room, setRoom] = useState("");
  const handleClick1 = () => {
    if (valid) {
      setValid(() => setValid(false));
    } else {
      setValid(() => setValid(true));
    }
    sendMessage();
  };
  const handleClick2 = () => {
    joinRoom();
  };

  const joinRoom = () => {
    socket.emit("join_room", room, (message) => {
      console.log(message);
    });
  };
  const sendMessage = () => {
    console.log(message);
    socket.emit("send_message", message, room);
  };
  useEffect(() => {
    socket.on("recieve_message", (message) => {
      setMessageRecieved(() => setMessageRecieved(message));
    });
  }, [socket]);
  useEffect(() => {
    setArray(() => [...array, messageRecieved]);
  }, [messageRecieved]);
  useEffect(() => {
    setArray(() => [...array, message]);
    setMessage(() => setMessage(""));
  }, [valid]);
  return (
    <div>
      <h1>{room}</h1>
      <input
        type="text"
        placeholder="Send a Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={handleClick1}>Send</button>
      <br></br>
      <input
        type="text"
        placeholder="Enter Room Id"
        value={room}
        onChange={(e1) => setRoom(e1.target.value)}
      ></input>
      <button onClick={handleClick2}>Room</button>
      <div className="MessageBox">
        {array.map((array, i) => (
          <div key={i} className="message-box-elements">
            {array}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
