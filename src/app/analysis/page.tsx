"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Flex, message } from "antd";

const PROXY_API_URL = process.env.NEXT_PUBLIC_PROXY_API_URL;

const Analysis = () => {
  const [messageApi, contextHolder] = message.useMessage();

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

      console.log(await res.json());
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
          Analysis
        </div>
      </Flex>
    </>
  );
};

export default Analysis;
