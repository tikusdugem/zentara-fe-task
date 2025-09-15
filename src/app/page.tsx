"use client";

import "@ant-design/v5-patch-for-react-19";
import { Flex, Select } from "antd";

export default function Home() {
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

  return (
    <Flex justify="center">
      <div style={{ width: "100%", maxWidth: 1440, padding: 16 }}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select Country"
          options={countryOpt}
          maxCount={5}
        />
      </div>
    </Flex>
  );
}
