import { FC } from "react";
import { Button } from "antd";

interface IExportButtonProps {
  conversation: { role: string; content: string }[];
}

const ExportButton: FC<IExportButtonProps> = ({ conversation }) => {
  const handleOnClick = () => {
    const mdContent = conversation
      .map((chat) => `**${chat.role.toUpperCase()}**: ${chat.content}`)
      .join("\n\n");

    const blob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "analysis-reports.md";
    a.click();
  };

  return <Button onClick={handleOnClick}>Export Markdown</Button>;
};

export default ExportButton;
