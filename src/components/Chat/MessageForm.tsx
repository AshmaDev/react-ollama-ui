import { useState } from "react";
import { PaperPlane } from "@phosphor-icons/react";
import { useChat } from "@/contexts/ChatContext";
import { useSettings } from "@/contexts/SettingsContext";

const MessageForm = () => {
  const { model } = useSettings();
  const { sendMessage } = useChat();
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    const trimmedInput = input.trim();

    if (trimmedInput) {
      sendMessage(trimmedInput);
      setInput("");
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  return (
    <div className="flex items-center border-t border-neutral-100 p-4 gap-3">
      <textarea
        className="flex-1 resize-none rounded-full py-2 px-4 border border-neutral-200 bg-neutral-50 outline-none focus:border-neutral-300"
        rows={1}
        value={input}
        onChange={handleChange}
        onKeyDown={handleEnter}
        placeholder="Type your message..."
        disabled={!model}
      />

      <button
        type="button"
        className="text-neutral-600"
        onClick={handleSend}
        disabled={!model}
      >
        <PaperPlane size={24} />
      </button>
    </div>
  );
};

export default MessageForm;
