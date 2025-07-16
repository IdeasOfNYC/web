import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { IdeaPanel } from "~/components/IdeaPanel";
import { Search } from "~/components/Search";
import { SidebarIdea } from "~/components/SidebarIdea";
import { IdeaContext } from "~/context/IdeaContext";
import { BOROUGHS, type Borough } from "~/types";
import type { Idea } from "~/types";

const SideBar = () => {
  const ideaContext = useContext(IdeaContext);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [displayMode, setDisplayMode] = useState<"map" | "timeline">("map");
  const navigate = useNavigate();
  const PAGINATION_SIZE = 100;
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  useEffect(() => {
    if (ideaContext.ideas) setCurrentPage(0);
  }, [ideaContext.ideas]);

  useEffect(() => {
    if (displayMode === "map") navigate("/map");
    else navigate("/timeline");
  }, [displayMode, navigate]);

  const MemoizedIdeas = useMemo(() => {
    return ideaContext.ideas && currentPage !== null ? (
      <div className="flex flex-col gap-2 max-w-2xl">
        <>
          {ideaContext.ideas
            .slice(
              currentPage * PAGINATION_SIZE,
              (currentPage + 1) * PAGINATION_SIZE
            )
            .map((idea, idx) => (
              <SidebarIdea
                idea={idea}
                handleOpen={(idea) => {
                  setSelectedIdea(idea);
                }}
                key={idx}
              ></SidebarIdea>
            ))}
        </>
        <div className="w-full flex justify-center items-center gap-2 p-2">
          <button
            className="w-min h-full flex items-center p-2 hover:bg-neutral-50 bg-white cursor-pointer border border-neutral-200"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <p className="text-nowrap">
            Page {currentPage + 1} of{" "}
            {Math.floor(ideaContext.ideas.length / PAGINATION_SIZE)}
          </p>
          <button
            className="w-min h-full flex items-center p-2 hover:bg-neutral-50 bg-white cursor-pointer border border-neutral-200"
            disabled={
              currentPage + 1 >=
              Math.floor(ideaContext.ideas.length / PAGINATION_SIZE)
            }
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    ) : (
      <p>Loading Ideas...</p>
    );
  }, [currentPage, ideaContext.ideas]);

  if (ideaContext)
    return (
      <div className="flex w-full max-h-screen h-screen">
        <div
          className={`border border-r border-neutral-200 max-h-full overflow-y-scroll flex flex-col gap-2 min-w h-full`}
        >
          {selectedIdea ? (
            <button
              className="w-min h-full flex items-center p-2 hover:bg-neutral-50 bg-white cursor-pointer"
              onClick={() => setSelectedIdea(null)}
            >
              <span className="w-16">{">>"}</span>
            </button>
          ) : (
            <></>
          )}
          <div
            className={`flex-col gap-2 p-2 h-full w-full ${
              selectedIdea ? "hidden" : "flex"
            }`}
          >
            <div className="flex gap-2 w-full">
              <Search
                handleSearchTermChange={(newTerm) => {
                  const newFilterFunction = (idea: Idea) => {
                    const titleContains = idea.solution
                      .toLowerCase()
                      .includes(newTerm.toLocaleLowerCase());
                    return titleContains;
                  };
                  ideaContext.setIdeaFilter(newFilterFunction);
                }}
              ></Search>
              <select
                className="w-min p-2 border border-neutral-200"
                onChange={(e) => {
                  const selectedBorough = e.target.value;
                  if (
                    BOROUGHS.includes(selectedBorough as Borough) ||
                    selectedBorough === "All"
                  ) {
                    ideaContext.setTargetBorough(
                      selectedBorough as Borough | "All"
                    );
                  }
                }}
              >
                <option value="All">All Boroughs</option>
                {BOROUGHS.map((borough) => (
                  <option key={borough} value={borough}>
                    {borough.charAt(0).toUpperCase() + borough.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {MemoizedIdeas}
          </div>
        </div>
        <div className="w-full min-h-full relative">
          <Outlet></Outlet>

          <div className="absolute top-3 right-3">
            <button
              className="p-2 border border-neutral-200 bg-neutral-50 hover:bg-white"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>

          <div className="absolute top-2 left-2 border border-neutral-200 flex gap-2 p-1 bg-neutral-100">
            <button
              className={`${
                displayMode === "map"
                  ? "bg-white border-neutral-200 border hover:bg-neutral-50"
                  : "bg-neutral-100 hover:bg-neutral-50"
              } p-2 cursor-pointer`}
              onClick={() => setDisplayMode("map")}
            >
              Map
            </button>
            <button
              className={`${
                displayMode === "timeline"
                  ? "bg-white border-neutral-200 border hover:bg-neutral-50"
                  : "bg-neutral-100 hover:bg-neutral-50"
              } p-2 cursor-pointer`}
              onClick={() => setDisplayMode("timeline")}
            >
              Timeline
            </button>
          </div>
          {selectedIdea ? (
            <div className="absolute h-screen flex flex-col justify-center items-center right-0 top-0">
              <IdeaPanel
                idea={selectedIdea}
                handleClose={() => setSelectedIdea(null)}
              ></IdeaPanel>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  else
    return (
      <div className="flex">
        <p>Loading...</p>
        <Outlet></Outlet>
      </div>
    );
};

export default SideBar;
