import { type FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Typography } from "antd";
const { Paragraph } = Typography;

interface IStreamingTextProps {
  text: string;
}

const StreamingText: FC<IStreamingTextProps> = ({ text }) => {
  if (!text) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        ol: ({ children }) => (
          <Paragraph>
            <ol>{children}</ol>
          </Paragraph>
        ),
        ul: ({ children }) => (
          <Paragraph>
            <ul>{children}</ul>
          </Paragraph>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default StreamingText;
