import { useMemo, type FC } from "react";
import type { Idea } from "~/types";
import { getIASplits, type IASplits, IAColorMap } from "~/utils";

export interface IACirclesProps {
  ideas: Idea[];
  expanded?: boolean;
}

export const IACircles: FC<IACirclesProps> = ({ ideas, expanded = false }) => {
  const splits: IASplits = useMemo(() => getIASplits(ideas), [ideas]);

  return (
    <div className="rounded-md border-dashed border border-neutral-300 bg-white p-4 flex flex-col items-start justify-center space-y-4 w-min">
      <div className="flex flex-wrap gap-2">
        {/* sort the entries based on how long each entry value's length is */}
        {Object.entries(splits)
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
