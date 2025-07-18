import { useMemo, useState, useEffect, useRef, type FC } from "react";
import type { Idea } from "~/types";
import { truncate, getIASplits, IAColorMap } from "~/utils";

export interface IAScatterProps {
  ideas: Idea[];
  handleSelection: (Idea: Idea) => void;
}

export const IAScatter: FC<IAScatterProps> = ({ ideas, handleSelection }) => {
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

  const ideasByIA = useMemo<{ idea: Idea; impactAreaName: string }[]>(() => {
    const splits = getIASplits(ideas);

    const sortedImpactAreas = Object.entries(splits).sort(
      ([, ideasA], [, ideasB]) => ideasB.length - ideasA.length
    );

    const flattenedIdeas: { idea: Idea; impactAreaName: string }[] = [];
    sortedImpactAreas.forEach(([impactAreaName, ideasInArea]) => {
      ideasInArea.forEach((idea) => {
        flattenedIdeas.push({ idea, impactAreaName });
      });
    });
    return flattenedIdeas;
  }, [ideas]);

  return (
    <div className=" p-4 border border-neutral-500 border-dashed relative rounded-md flex flex-col bg-white/50 items-center gap-2">
      <p className="font-light text-neutral-400">
        Hover to preview, click to open
      </p>
      <div ref={parentRef} className="grid grid-cols-50 relative">
        {ideasByIA.map(({ idea, impactAreaName }, idx) => (
          <button
            onMouseEnter={() => setHoveredIdea(idea)}
            onMouseLeave={() => setHoveredIdea(null)}
            onClick={() => handleSelection(idea)}
            className={`w-2.5 h-2.5 rounded-full hover:scale-200 cursor-pointer ${IAColorMap(
              impactAreaName
            )} hover:border hover:border-white `}
            key={idx}
          ></button>
        ))}
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
