"use client";

import "@ant-design/v5-patch-for-react-19";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Country } from "@/types/index";
import { THREAT_LEVEL, THREAT_TYPES } from "@/constants";
import { getRandomItems, getRandomTimestamp } from "@/utils";

import CountryCard from "@/components/CountryCard";
import { Flex, message, Select, Spin } from "antd";

const TREVORBLADES_API_URL = process.env.NEXT_PUBLIC_TREVORBLADES_API_URL;

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCountries = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(TREVORBLADES_API_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            {
              countries {
                code
                name
                emoji
                awsRegion
                native
                phone
                currency
                capital
              }
            }
          `,
        }),
      });

      if (!res.ok) throw new Error(`Error Status: ${res.status}`);

      const { data }: { data: { countries: Country[] } } = await res.json();
      const mockCountries: Country[] = data.countries.map((country) => ({
        ...country,

        // Mock Threats
        threats: {
          level: getRandomItems(THREAT_LEVEL),
          type: getRandomItems(THREAT_TYPES),
          timestamps: dayjs(getRandomTimestamp()).format(
            "DD-MM-YYYY, HH:mm:ss"
          ),
          descriptions: `Suspicious ${
            Math.random() < 0.5 ? "activity" : "incident"
          }`,
          comparison: THREAT_TYPES.map(
            () => Math.floor(Math.random() * 100) + 1
          ),
        },

        // Select Options Needs
        label: country.name,
        value: country.name,
      }));

      setCountries(mockCountries);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error Get Countries",
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      {contextHolder}

      <Spin spinning={isLoading} fullscreen />

      <Flex justify="center">
        <div style={{ width: "100%", maxWidth: 1440, padding: 16 }}>
          <Flex vertical gap="middle">
            <Select
              mode="multiple"
              allowClear
              style={{ width: 288 }}
              placeholder="Select Country"
              options={countries}
              maxCount={5}
              onChange={(_, options) =>
                setSelectedCountries(options as Country[])
              }
            />

            <Flex wrap gap="small" justify="center">
              {selectedCountries.map((country, index) => (
                <CountryCard key={index} country={country} />
              ))}
            </Flex>
          </Flex>
        </div>
      </Flex>
    </>
  );
}
