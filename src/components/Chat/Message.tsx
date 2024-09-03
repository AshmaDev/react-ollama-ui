interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message = ({ text, isUser }: MessageProps) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white max-w-lg"
            : "bg-gray-300 text-black max-w-2xl"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
