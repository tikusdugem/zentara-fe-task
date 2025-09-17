import { THREAT_LEVEL, THREAT_TYPES } from "@/constants";

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
  type: ThreatType;
  level: ThreatLevel;
  timestamps: string;
  descriptions: string;
};

type ThreatLevel = (typeof THREAT_LEVEL)[number];
type ThreatType = (typeof THREAT_TYPES)[number];
