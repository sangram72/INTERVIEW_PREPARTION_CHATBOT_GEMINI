import type{ ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      style={{
        margin: '10px 0',
        textAlign: isUser ? 'right' : 'left',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          maxWidth: '80%',
          padding: '10px',
          borderRadius: '6px',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message.content || "Not available"}
      </span>
    </div>
  );
};

export default ChatMessage;