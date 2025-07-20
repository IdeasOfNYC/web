import { useContext, useEffect, useMemo, useState, type FC } from "react";
import BlockButton from "~/components/Button";
import { IACircles } from "~/components/IACircles";
import { IAScatter } from "~/components/IAScatter";
import { IdeaContext } from "~/context/IdeaContext";
import { type Idea } from "~/types";

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

const Timeline = () => {
  const ideaContext = useContext(IdeaContext);
  const { ideaFilter, setIdeaFilter, filteredIdeas } = ideaContext;

  const [stageIdeas, setStageIdeas] = useState<Idea[]>([]);
  const [didNotAdvance, setDidNotAdvance] = useState<Idea[]>([]);
  const [advanced, setAdvanced] = useState<Idea[]>([]);
  const [scatterIdeas, setScatterIdeas] = useState<
    "stage" | "did not advance" | "advanced" | null
  >(null);

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

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-between py-16 overflow-y-scroll pb-8">
      <div className=" flex flex-col items-center justify-center gap-32 py-16">
        <button
          className={`${
            ideaFilter.stage === "submitted"
              ? "bg-amber-300 hover:bg-amber-200 border-amber-500 hover:border-amber-400"
              : ideaFilter.stage === "BA"
              ? "bg-green-200 hover:bg-green-100 border-green-500 hover:border-green-400"
              : "bg-cyan-200 hover:bg-cyan-100 border-cyan-500 hover:border-cyan-400"
          } w-full max-w-2xl h-16 rounded-md flex items-center justify-center border cursor-pointer`}
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
            className={`bg-neutral-100 hover:bg-neutral-50 border-neutral-400 hover:border-neutral-300 w-min max-w-2xl h-16 rounded-md flex items-center justify-center border px-8 cursor-pointer`}
            onClick={() => setScatterIdeas("did not advance")}
          >
            <p className="text-nowrap">
              <span className="font-medium">{didNotAdvance.length} </span>
              {`ideas ${
                ideaFilter.stage === "submitted"
                  ? "did not advance to Borough Assembly (BA) review"
                  : ideaFilter.stage === "BA"
                  ? "did not get added to final ballot"
                  : "did not get chosen for implementation"
              }`}
            </p>
          </button>

          <button
            className={`${
              ideaFilter.stage === "submitted"
                ? "bg-green-200 hover:bg-green-100 border-green-500 hover:border-green-400"
                : ideaFilter.stage === "BA"
                ? "bg-cyan-200 hover:bg-cyan-100 border-cyan-500 hover:border-cyan-400"
                : "bg-purple-200 hover:bg-purple-100 border-purple-500 hover:border-purple-400"
            } w-min max-w-2xl h-16 rounded-md flex items-center justify-center border px-8 cursor-pointer`}
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
            <p>
              Lorem ipsum dolor sit amet consecetur, adipisicing elit. Beatae
              doloremque iure nihil natus nisi quas obcaecati accusantium, alias
              voluptatibus rem incidunt commodi labore aperiam ullam quasi eius!
              Necessitatibus, accusamus amet!
            </p>
            <div className="w-full flex justify-between items-center pt-16">
              <BlockButton
                message="Previous Stage"
                handleClick={() =>
                  ideaFilter.stage === "ballot"
                    ? setIdeaFilter({ ...ideaFilter, stage: "BA" })
                    : setIdeaFilter({ ...ideaFilter, stage: "submitted" })
                }
              ></BlockButton>
              <div className="flex items-end w-full justify-center pr-32 pl-16">
                <TimelineCircle
                  first={true}
                  toggled={true}
                  label="Submission"
                ></TimelineCircle>
                <TimelineCircle
                  first={false}
                  toggled={
                    ideaFilter.stage === "BA" || ideaFilter.stage === "ballot"
                  }
                  label="Borough Assembly"
                ></TimelineCircle>
                <TimelineCircle
                  first={false}
                  toggled={ideaFilter.stage === "ballot"}
                  label="Final Ballot"
                ></TimelineCircle>
              </div>
              <BlockButton
                message="Next Stage"
                handleClick={() =>
                  ideaFilter.stage === "submitted"
                    ? setIdeaFilter({ ...ideaFilter, stage: "BA" })
                    : setIdeaFilter({ ...ideaFilter, stage: "ballot" })
                }
              ></BlockButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
