// given the following data, fill out the two functions defined in utils.ts

export type Borough =
  | "brooklyn"
  | "manhattan"
  | "bronx"
  | "staten island"
  | "queens";

export const BOROUGHS: Borough[] = [
  "brooklyn",
  "bronx",
  "manhattan",
  "queens",
  "staten island",
];

// for mock data; replace with real data once csv is cleaned
export type TestType = "Type A" | "Type B" | "Type C";
export const TESTTYPES: TestType[] = ["Type A", "Type B", "Type C"];
export type TestImpact = "Health" | "Education" | "Community";
export const TESTIMPACTS: TestImpact[] = ["Health", "Education", "Community"];

export type Option<T> = "None" | T;

export interface BAStatus {
  BAImpactArea: string[];
  BASubcategory: string[];
  Final20Ideas: boolean;
  FinalBallot: boolean;
  FinalDescription: string;
  FinalTitle: string;
}

export interface Idea {
  audience: string[];
  borough: Borough;
  flags: string[];
  IGSession: string;
  originalTitle: string;
  challenge: string;
  solution: string;
  ideaType: string;
  impactArea: string[];
  subCategory: string[];
  status: Option<BAStatus>;
}

export function isBAStatus(obj: unknown): obj is BAStatus {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const o = obj as Record<string, unknown>;

  return (
    Array.isArray(o.BAImpactArea) &&
    o.BAImpactArea.every((item) => typeof item === "string") &&
    Array.isArray(o.BASubcategory) &&
    o.BASubcategory.every((item) => typeof item === "string") &&
    typeof o.Final20Ideas === "boolean" &&
    typeof o.FinalBallot === "boolean" &&
    typeof o.FinalDescription === "string" &&
    typeof o.FinalTitle === "string"
  );
}

export function isIdea(obj: unknown): obj is Idea {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const o = obj as Record<string, unknown>;

  const validBoroughs = new Set([
    "brooklyn",
    "bronx",
    "manhattan",
    "queens",
    "staten island",
  ]);

  return (
    Array.isArray(o.audience) &&
    o.audience.every((item) => typeof item === "string") &&
    typeof o.borough === "string" &&
    validBoroughs.has(o.borough) &&
    Array.isArray(o.flags) &&
    o.flags.every((item) => typeof item === "string") &&
    typeof o.IGSession === "string" &&
    typeof o.originalTitle === "string" &&
    typeof o.challenge === "string" &&
    typeof o.solution === "string" &&
    typeof o.ideaType === "string" &&
    Array.isArray(o.impactArea) &&
    o.impactArea.every((item) => typeof item === "string") &&
    Array.isArray(o.subCategory) &&
    o.subCategory.every((item) => typeof item === "string") &&
    (o.status === "None" || isBAStatus(o.status))
  );
}

export type IdeaFilterFunction = (idea: Idea) => boolean;
