import {
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  type FC,
} from "react";
import BlockButton from "~/components/Button";
import { IACircles } from "~/components/IACircles";
import { IAScatter } from "~/components/IAScatter";
import { IdeaContext } from "~/context/IdeaContext";
import { BOROUGHS, type Borough, type Idea } from "~/types";

interface TimelineCircleProps {
  first: boolean;
  label: string;
  toggled: boolean;
}

const TimelineCircle: FC<TimelineCircleProps> = ({ first, label, toggled }) => {
  const labeledCircle = useMemo(() => {
    return (
      <div className="w-8 h-8">
        <div className="flex gap-2 -rotate-45 h-8">
          <span
            className={`border-8 min-w-8 min-h-8 w-8 h-8 rounded-full bg-white ${
              toggled ? "border-amber-300" : "border-neutral-300"
            }`}
          ></span>
          <p className="bg-white p-2 border-dashed border border-neutral-400 h-min rounded-full -translate-y-1/4 text-nowrap">
            {label}
          </p>
        </div>
      </div>
    );
  }, [label, toggled]);
  return first ? (
    labeledCircle
  ) : (
    <div className="flex items-center justify-center w-full">
      <span
        className={`w-full h-2 ${toggled ? "bg-amber-300" : "bg-neutral-300"}`}
      ></span>
      {labeledCircle}
    </div>
  );
};

interface SankeyConnectionProps {
  color: string;
  fromX: number;
  fromWidth: number;
  toX: number;
  toWidth: number;
  height: number;
  positions: {
    top: DOMRect | null;
    left: DOMRect | null;
    right: DOMRect | null;
  };
  side: "left" | "right";
}

const SankeyConnection: React.FC<SankeyConnectionProps> = ({
  color,
  fromX,
  fromWidth,
  toX,
  toWidth,
  height,
  positions,
  side,
}) => {
  const pathData = useMemo(() => {
    const containerRect = document
      .querySelector(
        ".flex.flex-col.items-center.justify-center.gap-32.py-16.relative"
      )
      ?.getBoundingClientRect();
    if (!containerRect || !positions.top) return "";

    const topRect = positions.top;
    const topLeft = topRect.left - containerRect.left;
    const topRight = topLeft + topRect.width;
    const topMid = topLeft + topRect.width / 2;
    const topY = topRect.top + topRect.height / 2 - containerRect.top;

    const inset = 20;

    const rawTargetLeft = toX - containerRect.left;
    const rawTargetRight = rawTargetLeft + toWidth;

    const targetLeft =
      side === "left" ? rawTargetLeft + inset : rawTargetLeft + inset;

    const targetRight =
      side === "left" ? rawTargetRight - inset : rawTargetRight - 30;

    const targetRect = side === "left" ? positions.left : positions.right;
    const targetY = targetRect
      ? targetRect.top + targetRect.height / 2 - containerRect.top
      : height;

    const sourceStartX = side === "left" ? topLeft + inset : topMid - inset;
    const sourceEndX = side === "left" ? topMid - inset : topRight - inset;

    const thickness = 10;
    const halfT = thickness / 2;
    const srcUpperY = topY - halfT;
    const srcLowerY = topY + halfT;
    const tgtUpperY = targetY - halfT;

    const gapY = Math.max(0, targetY - topY);
    const c = gapY * 0.5;

    return `
      M ${sourceStartX} ${srcUpperY}
      L ${sourceEndX}   ${srcUpperY}
      C ${sourceEndX}   ${srcUpperY + c},
        ${targetRight} ${tgtUpperY - c},
        ${targetRight} ${tgtUpperY}
      L ${targetLeft}  ${tgtUpperY}
      C ${targetLeft}  ${tgtUpperY - c},
        ${sourceStartX} ${srcUpperY + c},
        ${sourceStartX} ${srcUpperY}
      Z

      M ${sourceStartX} ${srcLowerY}  /* ensure closed shape (SVG tolerant) */
    `;
  }, [fromX, fromWidth, toX, toWidth, height, positions, side]);

  if (!pathData) return null;

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-10"
      style={{ height }}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
    >
      <path d={pathData} fill={color} opacity={0.7} />
    </svg>
  );
};

const Timeline: React.FC = () => {
  const topRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const ideaContext = useContext(IdeaContext);
  const { ideaFilter, setIdeaFilter, filteredIdeas } = ideaContext;

  const [stageIdeas, setStageIdeas] = useState<Idea[]>([]);
  const [didNotAdvance, setDidNotAdvance] = useState<Idea[]>([]);
  const [advanced, setAdvanced] = useState<Idea[]>([]);
  const [scatterIdeas, setScatterIdeas] = useState<
    "stage" | "did not advance" | "advanced" | null
  >(null);

  const [positions, setPositions] = useState<{
    top: DOMRect | null;
    left: DOMRect | null;
    right: DOMRect | null;
  }>({ top: null, left: null, right: null });

  useEffect(() => {
    const updatePositions = () => {
      setPositions({
        top: topRef.current?.getBoundingClientRect() ?? null,
        left: leftRef.current?.getBoundingClientRect() ?? null,
        right: rightRef.current?.getBoundingClientRect() ?? null,
      });
    };
    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [ideaFilter.stage]);

  const submittedIdeas = useMemo(() => {
    return filteredIdeas || [];
  }, [filteredIdeas]);

  const baIdeas = useMemo(() => {
    return (filteredIdeas || []).filter((idea) => idea.status !== null);
  }, [filteredIdeas]);

  const didNotAdvanceBA = useMemo(() => {
    return (filteredIdeas || []).filter((idea) => idea.status === null);
  }, [filteredIdeas]);

  const ballotIdeas = useMemo(() => {
    return (filteredIdeas || []).filter((idea) => idea.status?.FinalBallot);
  }, [filteredIdeas]);

  const didNotAdvanceBallot = useMemo(() => {
    return (filteredIdeas || []).filter(
      (idea) => idea.status !== null && !idea.status.FinalBallot
    );
  }, [filteredIdeas]);

  const final20 = useMemo(() => {
    return (filteredIdeas || []).filter(
      (idea) => idea.status !== null && idea.status.Final20Ideas
    );
  }, [filteredIdeas]);

  const didNotAdvanceFinal20 = useMemo(() => {
    return (filteredIdeas || []).filter(
      (idea) => idea.status !== null && !idea.status.Final20Ideas
    );
  }, [filteredIdeas]);

  useEffect(() => {
    if (ideaFilter.stage === "submitted") {
      setStageIdeas(submittedIdeas);
      setAdvanced(baIdeas);
      setDidNotAdvance(didNotAdvanceBA);
    } else if (ideaFilter.stage === "BA") {
      setStageIdeas(baIdeas);
      setAdvanced(ballotIdeas);
      setDidNotAdvance(didNotAdvanceBallot);
    } else {
      setStageIdeas(ballotIdeas);
      setAdvanced(final20);
      setDidNotAdvance(didNotAdvanceFinal20);
    }
  }, [
    baIdeas,
    ballotIdeas,
    final20,
    didNotAdvance,
    didNotAdvanceBA,
    didNotAdvanceBallot,
    ideaFilter.stage,
    submittedIdeas,
    didNotAdvanceFinal20,
  ]);

  const getStageColors = () => {
    switch (ideaFilter.stage) {
      case "submitted":
        return {
          top: "bg-amber-300 hover:bg-amber-200 border-amber-500",
          right: "bg-green-200 hover:bg-green-100 border-green-500",
          leftSankey: "#F4F4F4",
          rightSankey: "#E5FFE5",
        };
      case "BA":
        return {
          top: "bg-green-200 hover:bg-green-100 border-green-500",
          right: "bg-cyan-200 hover:bg-cyan-100 border-cyan-500",
          leftSankey: "#F4F4F4",
          rightSankey: "#E9FAFF",
        };
      case "ballot":
        return {
          top: "bg-cyan-200 hover:bg-cyan-100 border-cyan-500",
          right: "bg-purple-200 hover:bg-purple-100 border-purple-500",
          leftSankey: "#F4F4F4",
          rightSankey: "#F6E6FF",
        };
      default:
        return {
          top: "bg-amber-300 hover:bg-amber-200 border-amber-500",
          right: "bg-green-200 hover:bg-green-100 border-green-500",
          leftSankey: "#F4F4F4",
          rightSankey: "#E5FFE5",
        };
    }
  };

  const colors = getStageColors();

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-between py-16 overflow-y-scroll pb-8">
      <div className="flex gap-2 items-center border border-dashed border-neutral3 p-1 bg-white h-12 absolute top-4 left-1/2 -translate-x-1/2 rounded-lg pl-4 shadow-xs z-20">
        <p>Showing ideas from</p>
        <select
          className="w-min p-2 border border-neutral2 bg-white hover:bg-neutral-50 active:bg-neutral-100 rounded-md cursor-pointer"
          value={ideaFilter.borough || ""}
          onChange={(e) =>
            setIdeaFilter({
              ...ideaFilter,
              borough:
                e.target.value === "" ? null : (e.target.value as Borough),
            })
          }
        >
          <option value="">All of NYC</option>
          {BOROUGHS.map((borough) => (
            <option key={borough} value={borough}>
              {borough.charAt(0).toUpperCase() + borough.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center justify-center gap-32 py-16 relative">
        {positions.top && positions.left && (
          <SankeyConnection
            color={colors.leftSankey}
            fromX={positions.top.x}
            fromWidth={positions.top.width}
            toX={positions.left.x}
            toWidth={positions.left.width}
            height={300}
            positions={positions}
            side="left"
          />
        )}
        {positions.top && positions.right && (
          <SankeyConnection
            color={colors.rightSankey}
            fromX={positions.top.x}
            fromWidth={positions.top.width}
            toX={positions.right.x}
            toWidth={positions.right.width}
            height={300}
            positions={positions}
            side="right"
          />
        )}

        <button
          ref={topRef}
          className={`${
            ideaFilter.stage === "submitted"
              ? "bg-yellow3 hover:bg-yellow2 active:bg-yellow1 border-yellow6 hover:border-yellow5 active:border-yellow4"
              : ideaFilter.stage === "BA"
              ? "bg-green2 hover:bg-green1 active:bg-green0 border-green5 hover:border-green4 active:border-green3"
              : "bg-cyan3 hover:bg-cyan2 active:bg-cyan1 border-cyan-500 hover:border-cyan-400"
          } w-full max-w-2xl h-12 rounded-full flex items-center justify-center border cursor-pointer relative z-10`}
          onClick={() => setScatterIdeas("stage")}
        >
          <p>
            <span className="font-medium">{stageIdeas.length} </span>
            {`ideas ${
              ideaFilter.stage === "submitted"
                ? "submitted"
                : ideaFilter.stage === "BA"
                ? "advanced to Borough Assembly (BA) review"
                : "added to final ballot"
            }`}
          </p>
        </button>

        <div className="flex w-full justify-center gap-16">
          <button
            ref={leftRef}
            className="w-min max-w-2xl h-12 rounded-full flex items-center justify-center border px-8 cursor-pointer relative1 z-10"
            style={{ backgroundColor: "#E1E1E1", borderColor: "#D1D5DB" }}
            onClick={() => setScatterIdeas("did not advance")}
          >
            <p className="text-nowrap">
              <span className="font-medium">{didNotAdvance.length} </span>
              {`ideas ${
                ideaFilter.stage === "submitted"
                  ? "not advanced to Borough Assembly (BA) review"
                  : ideaFilter.stage === "BA"
                  ? "not added to final ballot"
                  : "not chosen for implementation"
              }`}
            </p>
          </button>

          <button
            ref={rightRef}
            className={`${
              ideaFilter.stage === "submitted"
                ? "bg-green2 hover:bg-green1 active:bg-green0 border-green5 hover:border-green4 active:border-green30"
                : ideaFilter.stage === "BA"
                ? "bg-cyan3 hover:bg-cyan2 active:bg-cyan1 border-cyan-500 hover:border-cyan-40"
                : "bg-purple-200 hover:bg-purple-100 border-purple-500 hover:border-purple-400"
            } w-min max-w-2xl h-12 rounded-full flex items-center justify-center border px-8 cursor-pointer relative z-10`}
            onClick={() => {
              if (ideaFilter.stage !== "ballot")
                setIdeaFilter({
                  ...ideaFilter,
                  stage: ideaFilter.stage === "BA" ? "ballot" : "BA",
                });
              else setScatterIdeas("advanced");
            }}
          >
            <p className="text-nowrap">
              <span className="font-medium">{advanced.length} </span>
              {`ideas ${
                ideaFilter.stage === "submitted"
                  ? "advanced to Borough Assembly (BA) review"
                  : ideaFilter.stage === "BA"
                  ? "added to final ballot"
                  : "chosen for implementation"
              }`}
            </p>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-4 pb-4 flex-1">
        {scatterIdeas ? (
          <div className="w-3xl flex flex-col justify-start gap-2 relative">
            <button
              className=" absolute w-min bg-white px-4 py-2 cursor-pointer border border-neutral-200 hover:bg-neutral-50 right-2 top-2 z-20 "
              onClick={() => setScatterIdeas(null)}
            >
              Close
            </button>
            <div className="w-full">
              <IAScatter
                ideas={
                  scatterIdeas === "advanced"
                    ? advanced
                    : scatterIdeas === "did not advance"
                    ? didNotAdvance
                    : stageIdeas
                }
                handleSelection={ideaContext.setSelectedIdea}
              ></IAScatter>
            </div>
            <IACircles
              ideas={
                scatterIdeas === "advanced"
                  ? advanced
                  : scatterIdeas === "did not advance"
                  ? didNotAdvance
                  : stageIdeas
              }
              expanded={true}
              horizontal={true}
            ></IACircles>
          </div>
        ) : (
          <div className="w-4xl bg-white h-full border border-neutral-300 rounded-md flex flex-col items-center justify-between p-8">
            <h1 className="font-display text-2xl font-medium">
              {ideaFilter.stage === "submitted"
                ? "IDEA CREATION AND SUBMISSION"
                : ideaFilter.stage === "BA"
                ? "REVIEW IN BOROUGH ASSEMBLY"
                : "ADDED TO PUBLIC BALLOT FOR VOTING"}
            </h1>
<p className="text-center max-w-2xl text-neutral-700 mt-4 mb-12">
  {ideaFilter.stage === "submitted" && (
    <>
      Community members submit ideas that address local needs and priorities. These ideas form the foundation of the participatory budgeting process.
    </>
  )}
  {ideaFilter.stage === "BA" && (
    <>
      Ideas are reviewed by the Borough Assembly (BA), a team of community members and staff who assess feasibility, equity, and impact before selecting projects for the ballot.
    </>
  )}
  {ideaFilter.stage === "ballot" && (
    <>
      Finalist ideas appear on the ballot, where New Yorkers vote on which projects should receive funding for implementation in their neighborhoods.
    </>
  )}
</p>
 <div className="w-full flex justify-between items-center pt-16">
  <BlockButton
    message="Previous Stage"
    handleClick={() =>
      ideaFilter.stage === "ballot"
        ? setIdeaFilter({ ...ideaFilter, stage: "BA" })
        : setIdeaFilter({ ...ideaFilter, stage: "submitted" })
    }
    disabled={ideaFilter.stage === "submitted"} // 🔹 disables at first stage
  />

  <div className="flex items-end w-full justify-center pr-32 pl-16">
    <TimelineCircle first={true} toggled={true} label="Submission" />
    <TimelineCircle
      first={false}
      toggled={ideaFilter.stage === "BA" || ideaFilter.stage === "ballot"}
      label="Borough Assembly"
    />
    <TimelineCircle
      first={false}
      toggled={ideaFilter.stage === "ballot"}
      label="Final Ballot"
    />
  </div>

  <BlockButton
    message="Next Stage"
    handleClick={() =>
      ideaFilter.stage === "submitted"
        ? setIdeaFilter({ ...ideaFilter, stage: "BA" })
        : setIdeaFilter({ ...ideaFilter, stage: "ballot" })
    }
    disabled={ideaFilter.stage === "ballot"} // 🔹 disables at last stage
  />
</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
