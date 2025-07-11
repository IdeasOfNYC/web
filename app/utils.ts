import type {
  Idea,
  Borough,
  TestType,
  TestImpact,
  Option,
  BAStatus,
} from "./types";
import { BOROUGHS, TESTTYPES, TESTIMPACTS, isIdea } from "./types";

const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomArrayElements = <T>(arr: T[], min: number, max: number): T[] => {
  const numElements = Math.floor(Math.random() * (max - min + 1)) + min;
  const elements: T[] = [];
  for (let i = 0; i < numElements; i++) {
    elements.push(getRandomElement(arr));
  }
  return elements;
};

export const generateRandomIdea = (): Idea => {
  const randomBorough: Borough = getRandomElement(BOROUGHS);
  const randomIdeaType: TestType = getRandomElement(TESTTYPES);
  const randomImpactArea: TestImpact[] = getRandomArrayElements(
    TESTIMPACTS,
    1,
    5
  );
  const randomSubCategory: TestType[] = getRandomArrayElements(TESTTYPES, 1, 5);

  const statusOptions: Option<BAStatus>[] = [
    "None",
    {
      BAImpactArea: getRandomArrayElements(TESTIMPACTS, 1, 5),
      BASubcategory: getRandomArrayElements(TESTTYPES, 1, 5),
      Final20Ideas: Math.random() > 0.5,
      FinalBallot: Math.random() > 0.5,
      FinalDescription: `Original Title for ${randomIdeaType} Idea`,
      FinalTitle: `Original Title for ${randomIdeaType} Idea`,
    },
  ];
  const randomStatus: Option<BAStatus> = getRandomElement(statusOptions);

  return {
    audience: ["everyone", "someone"],
    borough: randomBorough,
    flags: ["flag1", "flag2"],
    IGSession: `Session ${Math.floor(Math.random() * 10) + 1}`,
    originalTitle: `Original Title for ${randomIdeaType} Idea`,
    challenge: `Challenge for ${randomImpactArea} area`,
    solution: `Solution for ${randomSubCategory} subcategory`,
    ideaType: randomIdeaType,
    impactArea: randomImpactArea,
    subCategory: randomSubCategory,
    status: randomStatus,
  };
};

export const generateNIdeas = (n: number): Idea[] => {
  const ideas: Idea[] = [];
  for (let i = 0; i < n; i++) {
    ideas.push(generateRandomIdea());
  }
  return ideas;
};

export const loadIdeas = async (): Promise<Idea[]> => {
  const res = await fetch("/2024Ideas.json");
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid data: expected an array");
  }

  const ideas: Idea[] = [];

  for (const item of data) {
    if (isIdea(item)) {
      ideas.push(item);
    } else {
      console.warn("Invalid idea object skipped:", item);
    }
  }

  return ideas;
};
