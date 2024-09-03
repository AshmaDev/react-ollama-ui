interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message = ({ text, isUser }: MessageProps) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-xl ${
          isUser
            ? "bg-neutral-100 text-neutral-800 max-w-lg"
            : "bg-white text-neutral-800 max-w-2xl"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
