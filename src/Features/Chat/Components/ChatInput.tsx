import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage('');
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        padding: '10px',
      }}
    >
      <input
        value={message}
        placeholder="Type your answer..."
        onChange={(e) => setMessage(e.target.value)}
        style={{
          flex: 1,
          padding: '8px',
        }}
      />

      <button
        onClick={handleSend}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;