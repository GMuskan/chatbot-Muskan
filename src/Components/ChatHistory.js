export const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory?.map((chat, index) => (
        <>
          {chat.query && (
            <div key={index + "-q"} className="chat-message user-message">
              <div className="user-text">🧑‍💻 {chat.query}</div>
            </div>
          )}
          {chat.response && (
            <div key={index + "-r"} className="chat-message bot-message">
              <div className="bot-text">🤖 {chat.response}</div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
