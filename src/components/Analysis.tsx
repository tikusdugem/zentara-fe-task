"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Flex, message, Space, Typography } from "antd";
const { Title } = Typography;

import AnalysisCard from "@/components/AnalysisCard";
import StreamingText from "@/components/StreamingText";
import ExportButton from "@/components/ExportButton";
import ChatInterface from "@/components/ChatInterface";

const PROXY_API_URL = process.env.NEXT_PUBLIC_PROXY_API_URL;

const Analysis = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [streamedText, setStreamedText] = useState<string>("");
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([]);
  const [question, setQuestion] = useState<string>("");
  const [controller, setController] = useState<AbortController | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const threat = searchParams.get("threat");
  const capital = searchParams.get("capital");
  const continent = searchParams.get("continent");

  const getAnalysis = async () => {
    let payload;

    if (question) {
      setConversation((prevState) => {
        const updatedConversation = [
          ...prevState,
          { role: "user", content: question },
        ];

        payload = { conversation: updatedConversation };
        return updatedConversation;
      });
    } else {
      payload = {
        country,
        threat,
        capital,
        continent,
      };
    }

    const abortController = new AbortController();
    setController(abortController);
    setIsStreaming(true);

    try {
      const res = await fetch(`${PROXY_API_URL}/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      if (!res.body) {
        throw new Error("Response body is null");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        setStreamedText(result);
      }

      setConversation((prevState) => [
        ...prevState,
        {
          role: "system",
          content: result,
        },
      ]);
      setStreamedText("");
      setQuestion("");
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        return console.log("Streaming stopped");
      }

      messageApi.open({
        type: "error",
        content: "Error Get Analysis",
      });

      console.error(error);
    } finally {
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  const stopStreaming = () => {
    if (controller) {
      controller.abort();
      setIsStreaming(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex justify="center">
        <div
          style={{
            width: "100%",
            maxWidth: 768,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Title underline>Analysis</Title>

          <AnalysisCard conversation={conversation} />
          <StreamingText text={streamedText} />

          <Space
            direction="vertical"
            style={{ width: "100%", marginTop: "auto" }}
          >
            <ExportButton
              conversation={conversation}
              isStreaming={isStreaming}
            />
            <ChatInterface
              question={question}
              setQuestion={setQuestion}
              getAnalysis={getAnalysis}
              isStreaming={isStreaming}
              stopStreaming={stopStreaming}
            />
          </Space>
        </div>
      </Flex>
    </>
  );
};

export default Analysis;
