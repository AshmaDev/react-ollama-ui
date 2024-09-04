import cn from "classnames";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as lightTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Logo from "../common/Logo";

interface MessageProps {
  text: string;
  isUser: boolean;
  type?: string;
}

const Message = ({ type, text, isUser }: MessageProps) => {
  return (
    <div
      className={`relative flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && <Logo size={6} className="absolute top-2 -left-5" />}

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
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className ?? "");

                return match ? (
                  <SyntaxHighlighter
                    // @ts-ignore
                    style={lightTheme}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
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
