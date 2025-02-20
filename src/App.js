import React, { useState } from "react";
import { useSelector } from "react-redux";
import { title } from "./utils";
import "./styles.css";

import { ChatHistory } from "./Components/ChatHistory";
import { Header } from "./Components/Header";
import { useChatbot } from "./Hooks/useChatbot";

export default function App() {
  const [query, setQuery] = useState("");
  const chatbot = useSelector((store) => store.chatbot);
  const { fetchInformation } = useChatbot();
  const { loading, chatHistory } = chatbot;

  const handleAsk = async () => {
    if (!query.trim()) return;
    await fetchInformation(query);
    setQuery("");
  };

  return (
    <div className="chat-container">
      <Header title={title} />
      <div className="chat-box">
        <ChatHistory chatHistory={chatHistory} />
        {loading && <p className="loading-text">Typing...</p>}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask me anything.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAsk()}
        />
        <button className="chat-button" onClick={handleAsk} disabled={loading}>
          Ask
        </button>
      </div>
    </div>
  );
}
