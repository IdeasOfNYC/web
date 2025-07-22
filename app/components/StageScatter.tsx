import { useMemo, useState, useEffect, useRef, type FC } from "react";
import type { Idea } from "~/types";
import { truncate } from "~/utils";
import { ScatterCircle } from "./ScatterCircle";

export interface StageScatterProps {
  ideas: Idea[];
  handleSelection: (Idea: Idea) => void;
}

export const StageScatter: FC<StageScatterProps> = ({
  ideas,
  handleSelection,
}) => {
  const [hoveredIdea, setHoveredIdea] = useState<Idea | null>(null);
  const solutionRef = useRef<HTMLParagraphElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (solutionRef.current && hoveredIdea && parentRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const relativeX = event.clientX - parentRect.left;
        const relativeY = event.clientY - parentRect.top;

        solutionRef.current.style.left = `${relativeX + 10}px`; // Add 10px offset
        solutionRef.current.style.top = `${relativeY + 10}px`; // Add 10px offset
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredIdea]);

  const submittedIdeas = useMemo<Idea[]>(
    () => ideas.filter((idea) => idea.status === null),
    [ideas]
  );
  const BAIdeas = useMemo<Idea[]>(
    () => ideas.filter((idea) => idea.status !== null),
    [ideas]
  );
  const ballotIdeas = useMemo<Idea[]>(
    () => ideas.filter((idea) => idea.status?.FinalBallot),
    [ideas]
  );

  return (
    <div className=" p-4 border border-neutral-500 border-dashed relative rounded-md flex flex-col bg-white items-center gap-2">
      <p className="font-light text-neutral-400">
        Hover to preview, click to open
      </p>
      <div ref={parentRef} className="flex flex-col gap-2 relative">
        <div className="flex flex-wrap">
          {submittedIdeas.map((idea, idx) => (
            <ScatterCircle
              onMouseEnter={() => setHoveredIdea(idea)}
              onMouseLeave={() => setHoveredIdea(null)}
              onClick={() => handleSelection(idea)}
              className={"bg-yellow3 hover:border hover:border-white"}
              key={idx}
            />
          ))}
        </div>
        <div className="flex flex-wrap">
          {BAIdeas.map((idea, idx) => (
            <ScatterCircle
              onMouseEnter={() => setHoveredIdea(idea)}
              onMouseLeave={() => setHoveredIdea(null)}
              onClick={() => handleSelection(idea)}
              className={"bg-green3 hover:border hover:border-white"}
              key={idx}
            />
          ))}
        </div>
        <div className="flex flex-wrap ">
          {ballotIdeas.map((idea, idx) => (
            <ScatterCircle
              onMouseEnter={() => setHoveredIdea(idea)}
              onMouseLeave={() => setHoveredIdea(null)}
              onClick={() => handleSelection(idea)}
              className={"bg-cyan3 hover:border hover:border-white"}
              key={idx}
            />
          ))}
        </div>

        {hoveredIdea ? (
          <p
            ref={solutionRef}
            className="absolute bg-white p-2 rounded-md border border-neutral-400 border-dashed shadow-lg z-50 pointer-events-none w-48 truncate text-wrap"
          >
            {truncate(hoveredIdea.solution, 100)}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
