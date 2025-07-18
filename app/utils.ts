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
    null,
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

export const toTitleCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const truncate = (str: string, charLimit: number) => {
  if (str.length <= charLimit) {
    return str;
  }
  return str.slice(0, charLimit) + "...";
};

/**
 * Interface for splitting ideas by impact area.
 * @property {Object.<string, Idea[]>} [key: string] - A dictionary where keys are impact area names and values are arrays of ideas belonging to that impact area.
 */
export interface IASplits {
  [key: string]: Idea[];
}

/**
 * Splits a list of ideas into groups based on their impact areas.
 * Each idea can belong to multiple impact areas.
 *
 * @param {Idea[]} ideas - An array of Idea objects to be categorized.
 * @returns {IASplits} An object where keys are trimmed impact area strings and values are arrays of Idea objects associated with that impact area.
 */
export const getIASplits = (ideas: Idea[]): IASplits => {
  const splits: IASplits = {};
  ideas.forEach((idea) => {
    if (idea.impactArea && idea.impactArea.length > 0) {
      idea.impactArea.forEach((area: string) => {
        const trimmedArea = area.trim();
        if (trimmedArea) {
          if (!splits[trimmedArea]) {
            splits[trimmedArea] = [];
          }
          splits[trimmedArea].push(idea);
        }
      });
    }
  });
  return splits;
};

/**
 * Provides a Tailwind CSS background color class based on the given impact area string.
 *
 * @param {string} impactArea - The name of the impact area.
 * @returns {string} A Tailwind CSS class string for background color.
 */
export const IAColorMap = (impactArea: string): string => {
  switch (impactArea) {
    case "Social Services & Accessiblity":
      return "bg-blue-300";
    case "Education":
      return "bg-green-300";
    case "Health & Wellbeing":
      return "bg-purple-300";
    case "Workforce Development":
      return "bg-yellow-300";
    case "Environment & Public Space":
      return "bg-teal-300";
    case "Public Safety":
      return "bg-red-300";
    case "Arts & Culture":
      return "bg-pink-300";
    case "Civic Engagement":
      return "bg-indigo-300";
    case "Other":
      return "bg-gray-300";
    default:
      return "bg-black";
  }
};

// hello this is the colour thing
export const getAdvancementStyles = (status: Option<BAStatus>): string => {
  if (status === null) {
    // Did Not Advance: failure red
    return "bg-red-100 border-red-200 text-red-800";
  } else if (status.Final20Ideas) {
    // finalist: bloo
    return "bg-blue-100 border-blue-200 text-blue-800";
  } else {
    // Advanced to BA: greeeeen shade
    return "bg-green-100 border-green-200 text-green-800";
  }
};
