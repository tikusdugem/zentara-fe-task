"use client";

import "@ant-design/v5-patch-for-react-19";
import { useEffect } from "react";
import dayjs from "dayjs";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/libs/store";
import { setSelectedCountry, setCountry } from "@/libs/slices/countriesSlices";

import { Country } from "@/types/index";
import { THREAT_LEVEL, THREAT_TYPES } from "@/constants";
import { getRandomItems, getRandomTimestamp } from "@/utils";

import CountryCard from "@/components/CountryCard";
import { Flex, Form, message, Select, Spin } from "antd";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const { loading, error, data } = useQuery<{ countries: Country[] }>(gql`
    query GetCountries {
      countries {
        code
        name
        emoji
        awsRegion
        native
        phone
        currency
        capital
        continent {
          name
        }
      }
    }
  `);

  const { countryList, selectedCountry } = useSelector(
    (state: RootState) => state.countries
  );
  const dispatch = useDispatch();

  // Handle Callback GraphQL
  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: "Error Get Countries",
      });

      return;
    }

    const mockCountries = data?.countries.map((country) => ({
      ...country,

      // Mock Threats
      threats: {
        level: getRandomItems(THREAT_LEVEL),
        type: getRandomItems(THREAT_TYPES),
        timestamps: dayjs(getRandomTimestamp()).format("DD-MM-YYYY, HH:mm:ss"),
        descriptions: `Suspicious ${
          Math.random() < 0.5 ? "activity" : "incident"
        }`,
        comparison: THREAT_TYPES.map(() => Math.floor(Math.random() * 100) + 1),
      },

      // Select Options Needs
      label: country.name,
      value: country.name,
    }));

    dispatch(setCountry(mockCountries));
  }, [data]);

  return (
    <>
      {contextHolder}

      <Spin spinning={loading} fullscreen />

      <Flex justify="center">
        <div style={{ width: "100%", maxWidth: 768, padding: 16 }}>
          <Flex vertical gap="middle">
            <Form.Item help="Max 5 Country">
              <Select
                mode="multiple"
                allowClear
                style={{ width: 288 }}
                placeholder="Select Country"
                options={countryList}
                maxCount={5}
                onChange={(value) => dispatch(setSelectedCountry(value))}
              />
            </Form.Item>

            <Flex wrap gap="small" justify="center">
              {selectedCountry.map((country, index) => (
                <CountryCard key={index} country={country} />
              ))}
            </Flex>
          </Flex>
        </div>
      </Flex>
    </>
  );
}
