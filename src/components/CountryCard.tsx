import { type JSX, useState } from "react";
import CountryTabInfo from "@/components/CountryTabInfo";
import { Card, Flex } from "antd";

import { TAB_LIST } from "@/constants/index";
import { Country } from "@/types/index";

interface ICountryProps {
  country: Country;
}
type ActiveTabKey = "threats" | "general";

const CountryCard = ({ country }: ICountryProps) => {
  const [activeTabKey, setActiveTabKey] = useState<ActiveTabKey>("threats");

  const cardContents: Record<string, JSX.Element> = {
    general: (
      <>
        <CountryTabInfo label="AWS Region" value={country.awsRegion} />
        <CountryTabInfo label="Phone" value={country.phone} />
        <CountryTabInfo label="Currency" value={country.currency} />
        <CountryTabInfo label="Native" value={country.native} />
        <CountryTabInfo label="Capital" value={country.capital} />
      </>
    ),
    threats: (
      <>
        <CountryTabInfo label="Level" value={country.threats.level} />
        <CountryTabInfo label="Type" value={country.threats.type} />
        <CountryTabInfo
          label="Descriptions"
          value={country.threats.descriptions}
        />
        <CountryTabInfo label="Timestamp" value={country.threats.timestamps} />
      </>
    ),
  };

  return (
    <Card
      title={country.name}
      extra={`${country.emoji} - ${country.code}`}
      style={{
        width: 288,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      onTabChange={(key) => setActiveTabKey(key as ActiveTabKey)}
    >
      <Flex vertical gap="small">
        {cardContents[activeTabKey]}
      </Flex>
    </Card>
  );
};

export default CountryCard;
