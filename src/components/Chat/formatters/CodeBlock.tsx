import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as lightTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
  className?: string;
  children?: ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className ?? "");

  return match ? (
    <SyntaxHighlighter style={lightTheme} language={match[1]} PreTag="div">
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};

export default CodeBlock;
