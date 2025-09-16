"use client";

import "@ant-design/v5-patch-for-react-19";
import { JSX, useState } from "react";

import { Card, Flex, Select, Typography } from "antd";
const { Text } = Typography;

export default function Home() {
  const [activeTabKey, setActiveTabKey] = useState("general");
  const countryOpt = [
    {
      label: "Indonesia",
      value: "indonesia",
    },
    {
      label: "Japan",
      value: "japan",
    },
    {
      label: "Australia",
      value: "australia",
    },
  ];

  const tabList = [
    {
      key: "general",
      label: "General",
    },
    {
      key: "threats",
      label: "Threats",
    },
  ];

  const cardContents: Record<string, JSX.Element> = {
    general: (
      <>
        <Flex justify="space-between">
          <Text type="secondary">AWS Region</Text>
          <Text>eu-south-1</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Phone</Text>
          <Text>376</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Currency</Text>
          <Text>EUR</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Native</Text>
          <Text>Andorra</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Capital</Text>
          <Text>Andorra La Vella</Text>
        </Flex>
      </>
    ),
    threats: (
      <>
        <Flex justify="space-between">
          <Text type="secondary">Level</Text>
          <Text>Andorra La Vella</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Type</Text>
          <Text>Andorra La Vella</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Descriptions</Text>
          <Text>Andorra La Vella</Text>
        </Flex>
        <Flex justify="space-between">
          <Text type="secondary">Timestamp</Text>
          <Text>Andorra La Vella</Text>
        </Flex>
      </>
    ),
  };

  return (
    <Flex justify="center">
      <div style={{ width: "100%", maxWidth: 1440, padding: 16 }}>
        <Flex vertical gap="middle">
          <Select
            mode="multiple"
            allowClear
            style={{ width: 288 }}
            placeholder="Select Country"
            options={countryOpt}
            maxCount={5}
          />

          <Flex wrap gap="small">
            <Card
              title="Indonesia"
              extra="🇦🇩 - ID"
              style={{
                width: 288,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={(key) => setActiveTabKey(key)}
            >
              <Flex gap="small" vertical>
                {cardContents[activeTabKey]}
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
}
