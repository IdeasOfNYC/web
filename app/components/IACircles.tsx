import { useMemo, type FC } from "react";
import type { Idea } from "~/types";

export interface IACirclesProps {
  ideas: Idea[];
  expanded?: boolean;
}

export interface IASplits {
  [key: string]: Idea[];
}

export const IACircles: FC<IACirclesProps> = ({ ideas, expanded = false }) => {
  const IASplits = useMemo(() => {
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
  }, [ideas]);

  const IAColorMap = (impactArea: string) => {
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

  return (
    <div className="rounded-md border-dashed border border-neutral-300 bg-white p-4 flex flex-col items-start justify-center space-y-4 w-min">
      <div className="flex flex-wrap gap-2">
        {/* sort the entries based on how long each entry value's length is */}
        {Object.entries(IASplits)
          .sort(([, ideasA], [, ideasB]) => ideasB.length - ideasA.length)
          .map(([impactArea, ideasInArea]) => (
            <div key={impactArea} className="flex items-center space-x-2">
              <div
                className={`rounded-full ${IAColorMap(
                  impactArea
                )} flex items-center justify-center text-neutral-900 font-medium text-sm`}
                style={{
                  width: `${ideasInArea.length / 30 + 24}px`,
                  minWidth: `${ideasInArea.length / 30 + 24}px`,
                  height: `${ideasInArea.length / 30 + 24}px`,
                  minHeight: `${ideasInArea.length / 30 + 24}px`,
                }}
              >
                {ideasInArea.length}
              </div>
              {expanded ? (
                <span className="text-sm text-neutral-700">{impactArea}</span>
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
