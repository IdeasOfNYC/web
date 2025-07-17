import { createContext } from "react";
import type { Idea, IdeaFilter } from "~/types";

export interface IdeaContextType {
  allIdeas: Idea[] | null;
  filteredIdeas: Idea[] | null;
  setIdeaFilter: (newFitler: IdeaFilter) => void;
  ideaFilter: IdeaFilter;
}

export const IdeaContext = createContext<IdeaContextType>({
  allIdeas: null,
  filteredIdeas: null,
  ideaFilter: {
    keyword: null,
    borough: null,
    impactArea: [],
    stage: "submitted",
  },
  setIdeaFilter: () => {},
});
