import cn from "classnames";
import ReactMarkdown from "react-markdown";
import Logo from "../common/Logo";
import CodeBlock from "./formatters/CodeBlock";

interface MessageProps {
  text: string;
  isUser: boolean;
  type?: string;
}

const Message = ({ type, text, isUser }: MessageProps) => {
  return (
    <div
      className={cn("relative flex", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && <Logo size="xs" className="absolute top-3 -left-5" />}

      <div
        className={cn("px-4 py-2 rounded-xl", {
          "text-red-500": type === "error",
          "bg-neutral-50 text-neutral-800 max-w-lg": isUser,
          "text-neutral-800 max-w-2xl": !isUser,
        })}
      >
        {!isUser && type !== "error" ? (
          <ReactMarkdown
            className="prose"
            components={{
              code: CodeBlock,
            }}
          >
            {text}
          </ReactMarkdown>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

export default Message;
