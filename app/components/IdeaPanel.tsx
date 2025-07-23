import { useState } from "react";
import type { FC } from "react";
import type { Idea } from "~/types";
import { toTitleCase, getAdvancementStyles } from "~/utils";

export interface IdeaPanelProps {
  idea: Idea;
  handleClose: (idea: Idea) => void;
}

export const IdeaPanel: FC<IdeaPanelProps> = ({ idea, handleClose }) => {
  const [showAllAudiences, setShowAllAudiences] = useState(false);
  const [showAllImpactAreas, setShowAllImpactAreas] = useState(false);
  const audienceToDisplay = showAllAudiences ? idea.audience : idea.audience.slice(0, 3);
  const impactAreasToDisplay = showAllImpactAreas ? idea.impactArea : idea.impactArea.slice(0, 3);

const getStageProgress = () => {
  if (!idea.status) return 1; // Submitted
  if (idea.status.FinalBallot) return 3; // On ballot
  return 2; // Advanced to BA but not on ballot
};

  const currentStage = getStageProgress();

  return (
    <div className="w-full max-w-3xl pt-6 px-6 pb-6 border border-neutral-200 bg-white flex flex-col gap-6 relative rounded-xl shadow-lg">
      <button
        className="absolute top-3 right-3 px-3 py-1 border border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm"
        onClick={() => handleClose(idea)}
      >
        Close
      </button>

      <h1 className="text-lg font-bold leading-tight font-sans">{idea.solution}</h1>

      <div className="flex gap-3 flex-wrap">
        <span className="border border-neutral-300 px-2 py-1 rounded-full text-sm">
          {toTitleCase(idea.borough)}
        </span>
        <span className={`px-2 py-1 rounded-full text-sm ${getAdvancementStyles(idea.status)}`}>
          {idea.status === null
            ? "Did Not Advance"
            : idea.status.Final20Ideas
            ? "Finalist"
            : "Advanced to BA"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-neutral-600">Impact Area:</label>
          <div className="flex flex-wrap gap-2">
            {impactAreasToDisplay.map((area, idx) => (
              <span key={idx} className="border border-neutral-300 px-2 py-1 rounded-full text-sm">
                {area}
              </span>
            ))}
            {idea.impactArea.length > 3 && (
              <button
                onClick={() => setShowAllImpactAreas(!showAllImpactAreas)}
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                {showAllImpactAreas ? "Show Less" : `+${idea.impactArea.length - 3} more...`}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-neutral-600">Audience:</label>
          <div className="flex flex-wrap gap-2">
            {audienceToDisplay.map((group, idx) => (
              <span key={idx} className="border border-neutral-300 px-2 py-1 rounded-full text-sm">
                {group}
              </span>
            ))}
            {idea.audience.length > 3 && (
              <button
                onClick={() => setShowAllAudiences(!showAllAudiences)}
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                {showAllAudiences ? "Show Less" : `+${idea.audience.length - 3} more...`}
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-1 text-neutral-700">Challenge</h2>
        <p className="text-sm text-neutral-700 whitespace-pre-line font-sans">{idea.challenge}</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-1 text-neutral-700">Proposed Solution</h2>
        <p className="text-sm text-neutral-700 whitespace-pre-line font-sans">{idea.solution}</p>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <div className="flex justify-between text-center text-sm text-neutral-500">
 {["Submitted", "Advanced to BA", "Finalist"].map((stage, idx) => (
  <div key={idx} className="flex flex-col items-center flex-1">
    <div
      className={`w-5 h-5 rounded-full border-2 mb-1 ${
        idx + 1 <= currentStage
          ? "bg-yellow-400 border-yellow-500"
          : "bg-neutral-200 border-neutral-300"
      }`}
    ></div>
    <span>{stage}</span>
  </div>
))}
        </div>
      </div>
    </div>
  );
};