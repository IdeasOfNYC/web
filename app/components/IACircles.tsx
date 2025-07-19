import { useMemo, type FC } from "react";
import type { Idea } from "~/types";
import { getIASplits, type IASplits, IAColorMap } from "~/utils";

export interface IACirclesProps {
  ideas: Idea[];
  expanded?: boolean;
  horizontal?: boolean;
}

export const IACircles: FC<IACirclesProps> = ({
  ideas,
  expanded = false,
  horizontal = false,
}) => {
  const splits: IASplits = useMemo(() => getIASplits(ideas), [ideas]);

  return (
    <div
      className={`rounded-md border-dashed border border-neutral-300 bg-white/50 p-4 flex ${
        horizontal ? "flex-row w-full" : "flex-col w-min"
      } items-start justify-center gap-4 pointer-events-none flex-wrap`}
    >
      {/* sort the entries based on how long each entry value's length is */}
      {Object.entries(splits)
        .sort(([, ideasA], [, ideasB]) => ideasB.length - ideasA.length)
        .slice(0, expanded ? Object.entries(splits).length : 3)
        .map(([impactArea, ideasInArea]) => (
          <div
            key={impactArea}
            className={`flex ${
              horizontal ? "items-start" : "items-center"
            } gap-2`}
          >
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
      {expanded && Object.entries(splits).length > 3 ? (
        <></>
      ) : (
        <div
          className={`rounded-full bg-white flex items-center justify-center text-neutral-500 font-medium text-sm w-8 h-8 min-w-8 min-h-8 border border-neutral-400 `}
        >
          {Math.max(0, Object.entries(splits).length - 3)}+
        </div>
      )}
    </div>
  );
};
