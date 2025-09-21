import { type FC } from "react";

import { Input } from "antd";
const { TextArea } = Input;

interface IChatInterfaceProps {
  setQuestion: (value: string) => void;
  getAnalysis: () => void;
}

const ChatInterface: FC<IChatInterfaceProps> = ({
  setQuestion,
  getAnalysis,
}) => {
  return (
    <TextArea
      style={{ width: "100%" }}
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
    />
  );
};

export default ChatInterface;
