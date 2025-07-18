import type { FC } from "react";
import type { Idea } from "~/types";
import { toTitleCase, getAdvancementStyles } from "~/utils";

export interface IdeaPanelProps {
  idea: Idea;
  handleClose: (idea: Idea) => void;
}

export const IdeaPanel: FC<IdeaPanelProps> = ({ idea, handleClose }) => {
  return (
    <div className="w-full max-w-3xl pt-3 px-3 pb-2.5 border border-neutral-200 bg-white flex flex-col gap-3 relative group rounded-lg">
      <button
        className="absolute top-3 right-3 px-3 py-1 border border-neutral-200 cursor-pointer hover:bg-neutral-50 bg-white text-neutral-400 hover:text-neutral-700 group-hover:visible invisible rounded-lg text-sm"
        onClick={() => handleClose(idea)}
      >
        Close
      </button>
      <h1 className="text-lg font-bold">{idea.solution}</h1>

      <div className="flex gap-4 w-full mb-3">
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

          <div className="flex flex-wrap gap-2 max-w-96">
            {idea.impactArea.map((someImpactArea, idx) => (
              <span
                className="border border-neutral-200 p-1 text-nowrap h-min rounded-full text-sm"
                key={idx}
              >
                {someImpactArea}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-neutral-600 text-nowrap">
            Audience:
          </label>

          <div className="flex flex-wrap gap-2 max-w-96">
            {idea.audience.map((someAudience, idx) => (
              <span
                className="border border-neutral-200 p-1 text-nowrap h-min rounded-full text-sm"
                key={idx}
              >
                {someAudience}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-neutral-600 text-nowrap">
          Challenge
        </label>
        <p>{idea.challenge}</p>
      </div>
    </div>
  );
};
