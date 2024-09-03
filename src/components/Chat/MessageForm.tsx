import { useState } from "react";
import { PaperPlane } from "@phosphor-icons/react";

interface MessageFormProps {
  onSendMessage: (message: string) => void;
}

const MessageForm = ({ onSendMessage }: MessageFormProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex items-center border-t border-neutral-100 p-4 gap-2">
      <textarea
        className="flex-1 resize-none rounded-full py-2 px-4 border border-neutral-200 bg-neutral-50"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message..."
      />
      <button type="button" className="text-neutral-600" onClick={handleSend}>
        <PaperPlane size={24} />
      </button>
    </div>
  );
};

export default MessageForm;
