
import InterviewSetup from './Components/InterviewSetup';
import ChatMessage from './Components/ChatMessage';
import ChatInput from './Components/ChatInput';
import useChat from './Hooks/useChat';

const ChatScreen = () => {
  const {
    config,
    messages,
    isLoading,
    error,
    startInterview,
    sendMessage,
    closeInterview,
  } = useChat();

  if (!config) {
    return (
      <div
        style={{
          padding: '20px',
        }}
      >
        <InterviewSetup
          onStart={startInterview}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '20px auto',
        border: '1px solid #ddd',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
   

      <div
        style={{
          padding: '15px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2>Interview Prep AI</h2>

          <p>
            {config.topic} - {config.experience}
          </p>

          <p>
            Preparation Time: {config.duration} minutes
          </p>
        </div>

        <button onClick={closeInterview}>
          Close
        </button>
      </div>

  

      <div
        style={{
          flex: 1,
          padding: '15px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {isLoading && (
          <p>AI is thinking...</p>
        )}

        {error && (
          <p
            style={{
              color: 'red',
            }}
          >
            {error}
          </p>
        )}
      </div>



      <ChatInput
        onSend={sendMessage}
      />
    </div>
  );
};

export default ChatScreen;

