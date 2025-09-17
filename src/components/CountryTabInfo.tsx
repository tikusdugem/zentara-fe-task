import { Flex, Typography } from "antd";
const { Text } = Typography;

interface ICountryTabInfoProps {
  label: string;
  value: string;
}

const CountryTabInfo = ({ label, value }: ICountryTabInfoProps) => {
  return (
    <Flex justify="space-between">
      <Text type="secondary">{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default CountryTabInfo;
