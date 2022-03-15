import React from "react";
import { useChat } from "../context/ChatContext";
import styles from "./styles.module.css";
import ChatItem from "./ChatItem";

function ChatList() {
  const { messages } = useChat();

  return (
    <div className={styles.chatlist}>
      <div>
        {messages.map((item, key) => (
          <ChatItem key={key} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
