import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as lightTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
        <ReactMarkdown
          className="space-y-4"
          components={{
            ul({ children }) {
              return (
                <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol style={{ paddingLeft: "20px", listStyleType: "decimal" }}>
                  {children}
                </ol>
              );
            },
            li({ children }) {
              return <li style={{ marginBottom: "0.5em" }}>{children}</li>;
            },
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");

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
      </div>
    </div>
  );
};

export default Message;
