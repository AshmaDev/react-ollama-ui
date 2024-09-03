import Message from "./Message";

interface MessageListProps {
  messages: { role: string; content: string }[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4 rounded-xl bg-white p-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.content}
            isUser={message.role === "user"}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
