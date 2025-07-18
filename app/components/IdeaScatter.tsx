import { useMemo, type FC } from "react";
import type { Idea } from "~/types";

export interface IdeaScatterProps {
  ideas: Idea[];
  handleSelection: (Idea: Idea) => void;
}

export const IdeaScatter: FC<IdeaScatterProps> = ({
  ideas,
  handleSelection,
}) => {
  const ideasByStage = useMemo<Idea[]>(() => {
    return ideas.sort((a, b) => {
      if (a.status && b.status) {
        if (
          (a.status.FinalBallot && b.status.FinalBallot) ||
          !(a.status.FinalBallot || b.status.FinalBallot)
        )
          return 0;
        else if (a.status.FinalBallot) return 1;
        else return -1;
      } else if (a.status) return 1;
      else if (b.status) return -1;
      else return 0;
    });
  }, [ideas]);
  return (
    <div className="grid grid-cols-50 bg-white/100 p-4 border border-neutral-500 border-dashed">
      {ideasByStage.map((idea, idx) => (
        <button
          onClick={() => handleSelection(idea)}
          className={`w-2 h-2 rounded-full hover:scale-200 ${
            idea.status
              ? idea.status.FinalBallot
                ? "bg-cyan-300 hover:border hover:border-cyan-500"
                : "bg-green-300 hover:border hover:border-green-500"
              : "bg-amber-300 hover:border hover:border-amber-500"
          }`}
          key={idx}
        ></button>
      ))}
    </div>
  );
};
