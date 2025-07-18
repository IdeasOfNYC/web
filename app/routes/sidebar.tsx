import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { IdeaPanel } from "~/components/IdeaPanel";
import { Search } from "~/components/Search";
import { SidebarIdea } from "~/components/SidebarIdea";
import { FilterPopup } from "~/components/FilterPopup";
import { IdeaContext } from "~/context/IdeaContext";
import { Link } from "react-router";

const SideBar = () => {
  const ideaContext = useContext(IdeaContext);
  const { filteredIdeas, selectedIdea, setSelectedIdea } = ideaContext;
  const [displayMode, setDisplayMode] = useState<"map" | "timeline">(
    window.location.pathname.endsWith("/map") ? "map" : "timeline"
  );
  const navigate = useNavigate();
  const PAGINATION_SIZE = 100;
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  useEffect(() => {
    if (filteredIdeas) setCurrentPage(0);
  }, [filteredIdeas]);

  useEffect(() => {
    if (displayMode === "map") navigate("/map");
    else navigate("/timeline");
  }, [displayMode, navigate]);

  const MemoizedIdeas = useMemo(() => {
    return filteredIdeas && currentPage !== null ? (
      <div className="flex flex-col gap-2 max-w-2xl">
        <>
          {filteredIdeas
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
            {Math.floor(filteredIdeas.length / PAGINATION_SIZE)}
          </p>
          <button
            className="w-min h-full flex items-center p-2 hover:bg-neutral-50 bg-white cursor-pointer border border-neutral-200"
            disabled={
              currentPage + 1 >=
              Math.floor(filteredIdeas.length / PAGINATION_SIZE)
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
  }, [currentPage, filteredIdeas, setSelectedIdea]);

  if (ideaContext)
    return (
      <div className="flex w-full max-h-screen h-screen bg-neutral-50">
        <div
          className={`max-h-full overflow-y-scroll flex flex-col gap-2 w-80 lg:w-96 xl:w-[30rem] flex-shrink-0 h-full`}
        >
          <div className={`flex flex-col gap-2 p-2 h-full w-full`}>
            <div className="flex gap-1 w-full">
              <div className="flex-1">
                <Search
                  handleSearchTermChange={(newTerm) => {
                    ideaContext.setIdeaFilter({
                      ...ideaContext.ideaFilter,
                      keyword: newTerm,
                    });
                  }}
                ></Search>
              </div>
              <div className="relative flex-shrink-0">
                <button
                  className="px-3 py-2 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 whitespace-nowrap"
                  onClick={() => setIsFilterPopupOpen(true)}
                >
                  Filter ▼
                </button>
                <FilterPopup
                  isOpen={isFilterPopupOpen}
                  onClose={() => setIsFilterPopupOpen(false)}
                />
              </div>
            </div>
            {MemoizedIdeas}
          </div>
        </div>
        <div className="w-full min-h-full relative">
          <Outlet></Outlet>

          <div className="absolute top-3 right-3 z-10">
            <Link to="/">
              <button className="p-2 border border-neutral-200 bg-neutral-50 hover:bg-white">
                Back to Home
              </button>
            </Link>
          </div>
          <div className="absolute top-2 left-2 border border-neutral-200 flex gap-2 p-1 bg-neutral-100 z-10">
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
            <div className="absolute h-screen w-full flex flex-col justify-center items-center top-0 left-0 z-20 bg-white/50">
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
