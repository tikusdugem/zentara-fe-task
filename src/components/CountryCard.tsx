import { type JSX, useState } from "react";
import { useRouter } from "next/navigation";

import CountryTabInfo from "@/components/CountryTabInfo";
import { Button, Card, Divider, Flex } from "antd";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

import { TAB_LIST, THREAT_TYPES } from "@/constants/index";
import { Country } from "@/types/index";

interface ICountryProps {
  country: Country;
}
type ActiveTabKey = "threats" | "general";

const CountryCard = ({ country }: ICountryProps) => {
  const router = useRouter();
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
    visualization: (
      <>
        <Pie
          data={{
            labels: THREAT_TYPES,
            datasets: [
              {
                label: " Activity",
                data: country.threats.comparison,
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgba(75, 192, 192, 1)",
                ],
                hoverOffset: 4,
              },
            ],
          }}
        />
      </>
    ),
  };

  const handleOnClick = () => {
    const query = {
      country: country.name,
      threat: country.threats.type,
      capital: country.capital,
      continent: country.continent.name,
    };
    const params = new URLSearchParams(query);

    router.push(`/analysis?${params.toString()}`);
  };

  return (
    <Card
      title={country.name}
      extra={`${country.emoji} - ${country.code}`}
      style={{
        minWidth: 288,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      onTabChange={(key) => setActiveTabKey(key as ActiveTabKey)}
    >
      <Flex vertical gap="small">
        {cardContents[activeTabKey]}
        <Divider size="small" />
        <Button type="primary" onClick={handleOnClick}>
          Analyze
        </Button>
      </Flex>
    </Card>
  );
};

export default CountryCard;
