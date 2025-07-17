import { useMemo } from "react";
import type { Idea } from "~/types";

export interface SplitViewerProps {
  ideas: Idea[];
  showLabels?: boolean;
}

export function SplitViewer({ ideas, showLabels = false }: SplitViewerProps) {
  const baIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      return idea.status !== null;
    });
  }, [ideas]);

  const ballotIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Logic based on root.tsx's stageFilter for "ballot"
      return idea.status?.FinalBallot;
    });
  }, [ideas]);

  return (
    <div className="rounded-md border-dashed border border-neutral-300 bg-white p-4 flex flex-col items-start justify-center space-y-4 w-min">
      <div className="flex items-center space-x-2">
        <div
          className="rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold"
          style={{
            width: `${ideas.length / 30 + 32}px`,
            height: `${ideas.length / 30 + 32}px`,
          }}
        >
          {ideas.length}
        </div>
        {showLabels ? (
          <span className="text-sm text-neutral-700">Submitted</span>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold"
          style={{
            width: `${baIdeas.length / 30 + 32}px`,
            height: `${baIdeas.length / 30 + 32}px`,
          }}
        >
          {baIdeas.length}
        </div>
        {showLabels ? (
          <span className="text-sm text-neutral-700">BA</span>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold"
          style={{
            width: `${ballotIdeas.length / 30 + 32}px`,
            height: `${ballotIdeas.length / 30 + 32}px`,
          }}
        >
          {ballotIdeas.length}
        </div>
        {showLabels ? (
          <span className="text-sm text-neutral-700">Ballot</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
