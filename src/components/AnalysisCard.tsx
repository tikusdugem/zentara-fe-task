import { type FC, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Divider, Typography } from "antd";
const { Paragraph, Text } = Typography;

interface IAnalysisCardProps {
  conversation: { role: string; content: string }[];
}

const AnalysisCard: FC<IAnalysisCardProps> = ({ conversation }) => {
  return conversation.map((chat, index) => (
    <Fragment key={index}>
      {chat.role === "user" ? (
        <Paragraph>
          <pre>{chat.content}</pre>
        </Paragraph>
      ) : (
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
            pre: ({ children }) => (
              <Paragraph>
                <pre>{children}</pre>
              </Paragraph>
            ),
            code: ({ children }) => (
              <Paragraph>
                <Text code>{children}</Text>
              </Paragraph>
            ),
          }}
        >
          {chat.content}
        </ReactMarkdown>
      )}
      <Divider />
    </Fragment>
  ));
};

export default AnalysisCard;
