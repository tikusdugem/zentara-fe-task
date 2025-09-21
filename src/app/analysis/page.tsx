"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button, Divider, Flex, Input, message, Space, Typography } from "antd";
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PROXY_API_URL = process.env.NEXT_PUBLIC_PROXY_API_URL;

const Analysis = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [streamedText, setStreamedText] = useState<string>("");

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
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error Get Analysis",
      });

      console.error(error);
    }
  };

  // useEffect(() => {
  //   getAnalysis();
  // }, []);

  return (
    <>
      {contextHolder}

      <Flex justify="center">
        <div style={{ width: "100%", maxWidth: 768, padding: 16 }}>
          <Title>Analysis</Title>
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
            {/* {streamedText} */}
            {
              "**Cybersecurity Threat Landscape Analysis for Indonesia**\n\n**Risk Assessment Summary:**\nIndonesia faces a significant cybersecurity threat landscape, with malware being a major concern. The country's growing digital economy, increasing internet penetration, and rising mobile device usage have created an attractive target for cyber attackers. The risk assessment summary is as follows:\n\n* **Threat Level:** High\n* **Vulnerability:** Medium to High\n* **Impact:** Medium to High\n* **Likelihood:** High\n\nThe high threat level is due to the increasing number of malware attacks, which can compromise sensitive information, disrupt critical infrastructure, and cause significant financial losses. The medium to high vulnerability is attributed to the lack of cybersecurity awareness, inadequate security measures, and insufficient incident response planning. The medium to high impact is a result of the potential consequences of a successful attack, including data breaches, financial losses, and reputational damage.\n\n**Top 3 Immediate Recommendations:**\n\n1. **Implement Robust Anti-Malware Measures:** Immediately deploy and regularly update anti-malware software on all devices, including computers, laptops, and mobile devices. This will help detect and prevent malware infections, reducing the risk of data breaches and other cyber attacks.\n2. **Conduct Cybersecurity Awareness Campaigns:** Launch nationwide cybersecurity awareness campaigns to educate individuals, businesses, and organizations about the risks of malware and other cyber threats. This will help increase awareness and promote best practices, such as using strong passwords, avoiding suspicious emails, and keeping software up-to-date.\n3. **Establish Incident Response Plans:** Develop and implement incident response plans to quickly respond to and contain malware attacks. This will help minimize the impact of an attack, reduce downtime, and prevent further damage.\n\n**Long-term Security Strategy:**\n\n1. **Develop a National Cybersecurity Framework:** Establish a comprehensive national cybersecurity framework that outlines policies, guidelines, and standards for cybersecurity. This framework should include measures for preventing, detecting, and responding to cyber threats, as well as promoting cybersecurity awareness and education.\n2. **Invest in Cybersecurity Infrastructure:** Invest in modern cybersecurity infrastructure, including firewalls, intrusion detection systems, and security information and event management (SIEM) systems. This will help detect and prevent cyber threats, as well as improve incident response capabilities.\n3. **Foster International Cooperation:** Collaborate with international partners to share threat intelligence, best practices, and expertise in cybersecurity. This will help Indonesia stay ahead of emerging threats and improve its overall cybersecurity posture.\n4. **Develop Cybersecurity Talent:** Develop and train a skilled cybersecurity workforce to address the shortage of cybersecurity professionals in Indonesia. This can be achieved through education and training programs, as well as partnerships with international organizations and cybersecurity companies.\n5. **Implement Regular Security Audits and Penetration Testing:** Conduct regular security audits and penetration testing to identify vulnerabilities and weaknesses in Indonesia's cybersecurity infrastructure. This will help identify areas for improvement and ensure that the country's cybersecurity measures are effective and up-to-date.\n\nBy implementing these recommendations and strategies, Indonesia can improve its cybersecurity posture, reduce the risk of malware and other cyber threats, and protect its digital economy and critical infrastructure."
            }
          </ReactMarkdown>

          <Divider />

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button>Export PDF</Button>
            <TextArea
              style={{ width: "100%" }}
              size="large"
              autoSize
              rows={1}
              placeholder="Ask something"
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                }
              }}
            />
          </Space>
        </div>
      </Flex>
    </>
  );
};

export default Analysis;
