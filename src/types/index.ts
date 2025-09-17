export type Country = {
  code: string;
  name: string;
  emoji: string;
  awsRegion: string;
  native: string;
  phone: string;
  currency: string;
  capital: string;
  threats: Threats;
};

type Threats = {
  type: "Malware" | "Phishing" | "DDoS" | "Data Breach";
  level: "Low" | "Medium" | "High" | "Critical";
  timestamps: string;
  descriptions: string;
};
