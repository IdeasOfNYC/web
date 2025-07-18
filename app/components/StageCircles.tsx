import { useMemo } from "react";
import type { Idea } from "~/types";

export interface StageCirclesProps {
  ideas: Idea[];
  expanded?: boolean;
}

export function StageCircles({ ideas, expanded = false }: StageCirclesProps) {
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
          className="rounded-full bg-amber-300 flex items-center justify-center text-neutral-900 font-medium text-sm"
          style={{
            width: `${ideas.length / 30 + 32}px`,
            minWidth: `${ideas.length / 30 + 32}px`,
            height: `${ideas.length / 30 + 32}px`,
            minHeight: `${ideas.length / 30 + 32}px`,
          }}
        >
          {ideas.length}
        </div>
        {expanded ? (
          <span className="text-sm text-neutral-700 min-w-36">Submitted</span>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-neutral-900 font-medium text-sm"
          style={{
            width: `${baIdeas.length / 30 + 32}px`,
            minWidth: `${baIdeas.length / 30 + 32}px`,
            height: `${baIdeas.length / 30 + 32}px`,
            minHeight: `${baIdeas.length / 30 + 32}px`,
          }}
        >
          {baIdeas.length}
        </div>
        {expanded ? (
          <span className="text-sm text-neutral-700 text-nowrap">
            <p>Advanced to</p>
            <p>Borough Assembly (BA)</p>
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-full bg-cyan-300 flex items-center justify-center text-neutral-900 font-medium text-sm"
          style={{
            width: `${ballotIdeas.length / 30 + 32}px`,
            minWidth: `${ballotIdeas.length / 30 + 32}px`,
            height: `${ballotIdeas.length / 30 + 32}px`,
            minHeight: `${ballotIdeas.length / 30 + 32}px`,
          }}
        >
          {ballotIdeas.length}
        </div>
        {expanded ? (
          <span className="text-sm text-neutral-700">Added to Ballot</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
