import type { FC } from "react";
import type { Idea } from "~/types";
import { toTitleCase, getAdvancementStyles } from "~/utils";

export interface SidebarIdeaProps {
  idea: Idea;
  handleOpen: (idea: Idea) => void;
}

export const SidebarIdea: FC<SidebarIdeaProps> = ({ idea, handleOpen }) => {
  const MAX_TRUNCATE_THRESHOLD = 2;

  return (
    <div
      className="w-full pt-3 px-3 pb-2.5 border border-neutral-200 bg-white flex flex-col gap-3 relative group cursor-pointer hover:bg-neutral-50 rounded-lg"
      onClick={() => handleOpen(idea)}
    >
      <h1 className="text-lg font-bold leading-tight">{idea.solution}</h1>

      <div className="flex gap-4 w-full">
        <span className="border border-neutral-200 p-1 rounded-full text-sm">{toTitleCase(idea.borough)}</span>
        <span className={`p-1 rounded-full text-sm ${getAdvancementStyles(idea.status)}`}>
          {idea.status === null
            ? "Did Not Advance"
            : idea.status.Final20Ideas
            ? "Finalist"
            : "Advanced to BA"}
        </span>
      </div>
      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-neutral-600 text-nowrap">
            Impact Area:
          </label>

          <div className="flex gap-2">
            <>
              {idea.impactArea
                .slice(0, MAX_TRUNCATE_THRESHOLD)
                .map((someImpactArea, idx) => (
                  <span
                    className="border border-neutral-200 p-1 text-nowrap h-min rounded-full text-sm"
                    key={idx}
                  >
                    {someImpactArea}
                  </span>
                ))}
            </>
            {idea.impactArea.length - MAX_TRUNCATE_THRESHOLD > 0 ? (
              <span className="border border-neutral-200 p-1 text-nowrap h-min rounded-full text-sm">
                {`+${idea.impactArea.length - 2} More...`}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-neutral-600 text-nowrap">
            Audience
          </label>

          <div className="flex gap-2">
            <>
              {idea.audience
                .slice(0, 1)
                .map((someAudience, idx) => (
                  <span
                    className="border border-neutral-200 p-1 text-nowrap h-min rounded-full text-sm"
                    key={idx}
                  >
                    {someAudience}
                  </span>
                ))}
            </>
            {idea.audience.length > 1 ? (
              <span className="border border-neutral-200 p-1 text-nowrap h-min rounded-full text-sm">
                {`+${idea.audience.length - 1} More...`}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-1 w-full">
        <label className="text-sm text-neutral-600 text-nowrap">
          Challenge
        </label>
        <p>{idea.challenge}</p>
      </div> */}
    </div>
  );
};
