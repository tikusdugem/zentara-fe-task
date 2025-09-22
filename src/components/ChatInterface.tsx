import { type FC } from "react";

import { Button, Flex, Input } from "antd";
const { TextArea } = Input;

interface IChatInterfaceProps {
  question: string;
  setQuestion: (value: string) => void;
  getAnalysis: () => void;
  isStreaming: boolean;
  stopStreaming: () => void;
}

const ChatInterface: FC<IChatInterfaceProps> = ({
  question,
  setQuestion,
  getAnalysis,
  isStreaming,
  stopStreaming,
}) => {
  return (
    <Flex gap="small">
      <TextArea
        size="large"
        autoSize
        rows={1}
        placeholder="Ask something"
        onChange={(evt) => setQuestion(evt.target.value)}
        onPressEnter={(evt) => {
          if (!evt.shiftKey) {
            evt.preventDefault();
            getAnalysis();
          }
        }}
        value={question}
        disabled={isStreaming}
      />
      <Button
        size="large"
        onClick={() => {
          if (isStreaming) {
            stopStreaming();
          } else {
            getAnalysis();
          }
        }}
      >
        {isStreaming ? "Stop" : "Send"}
      </Button>
    </Flex>
  );
};

export default ChatInterface;
