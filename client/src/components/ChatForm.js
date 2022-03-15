import React, { useState } from "react";
import { sendMessage } from "../socketApi";
import styles from "./styles.module.css";
import { useChat } from "../context/ChatContext";

function ChatForm() {
  const [message, setMessage] = useState("");
  
  const {setMessages} = useChat()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);

    setMessages((prevState) => [...prevState, {message , fromMe:true}])
    sendMessage(message);

    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.textInput}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default ChatForm;
