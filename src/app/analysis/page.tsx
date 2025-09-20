"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, Flex, message } from "antd";

const PROXY_API_URL = process.env.NEXT_PUBLIC_PROXY_API_URL;

const Analysis = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [recommendations, setRecommendations] = useState<string>("");

  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const threat = searchParams.get("threat");
  const capital = searchParams.get("capital");
  const continent = searchParams.get("continent");

  const getAnalysis = async () => {
    try {
      const res = await fetch(`${PROXY_API_URL}/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, threat, capital, continent }),
      });
      const { content } = await res.json();

      setRecommendations(content);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error Get Analysis",
      });

      console.error(error);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  return (
    <>
      {contextHolder}

      <Flex justify="center">
        <div style={{ width: "100%", maxWidth: 1440, padding: 16 }}>
          <Card title="Analysis" style={{ minWidth: 288 }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p style={{ marginBottom: "1em" }}>{children}</p>
                ),
                ol: ({ children }) => (
                  <ol style={{ marginBottom: "1em", marginLeft: "1em" }}>
                    {children}
                  </ol>
                ),
                ul: ({ children }) => (
                  <ul style={{ marginBottom: "1em", marginLeft: "1em" }}>
                    {children}
                  </ul>
                ),
              }}
            >
              {recommendations}
            </ReactMarkdown>
          </Card>
        </div>
      </Flex>
    </>
  );
};

export default Analysis;
