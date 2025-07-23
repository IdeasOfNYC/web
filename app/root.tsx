import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { IdeaContext } from "./context/IdeaContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Idea, type IdeaFilter } from "./types";
import { loadIdeas } from "./utils";

// eslint-disable-next-line react-refresh/only-export-components
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[] | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [ideaFilter, setIdeaFilter] = useState<IdeaFilter>({
    keyword: null,
    borough: null,
    impactArea: [],
    audience: [],
    stage: "submitted",
  });

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadIdeas().then((ideas) => setIdeas(ideas));
  }, []);

  const filterFunction = useCallback(
    (idea: Idea) => {
      const boroughFilter = ideaFilter.borough
        ? idea.borough === ideaFilter.borough
        : true;
      const impactAreaFilter =
        ideaFilter.impactArea.length === 0 ||
        ideaFilter.impactArea.every((someImpactArea) => {
          return idea.impactArea.includes(someImpactArea);
        });
      const audienceFilter =
        ideaFilter.audience.length === 0 ||
        ideaFilter.audience.every((someAudience) => {
          console.log(someAudience, idea.audience);
          return idea.audience.includes(someAudience);
        });
      const keywordFilter = ideaFilter.keyword
        ? idea.solution
            .toLocaleLowerCase()
            .includes(ideaFilter.keyword.toLocaleLowerCase())
        : true;
      const stageFilter =
        (ideaFilter.stage === "ballot" && idea.status?.FinalBallot
          ? true
          : false) ||
        (ideaFilter.stage === "BA" && idea.status ? true : false) ||
        ideaFilter.stage === "submitted";
      return (
        boroughFilter &&
        impactAreaFilter &&
        audienceFilter &&
        keywordFilter &&
        stageFilter
      );
    },
    [
      ideaFilter.borough,
      ideaFilter.impactArea,
      ideaFilter.audience,
      ideaFilter.keyword,
      ideaFilter.stage,
    ]
  );

  const filterIdeas = useCallback(
    (allIdeas: Idea[]) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      setFilteredIdeas(() => []);
      const FILTER_SIZE = 100;
      const filterIdeasAux = (
        innerIdeas: Idea[],
        index: number,
        filterGroupSize: number
      ) => {
        const currentSlice = innerIdeas.slice(
          Math.max(0, index),
          Math.min(innerIdeas.length, index + filterGroupSize)
        );
        const filteredSlice = currentSlice.filter(filterFunction);

        setFilteredIdeas((lastFiltered) => {
          if (lastFiltered === null) return filteredSlice;
          else return [...lastFiltered, ...filteredSlice];
        });

        if (index + filterGroupSize < innerIdeas.length) {
          timeoutIdRef.current = setTimeout(() => {
            filterIdeasAux(
              innerIdeas,
              index + filterGroupSize,
              filterGroupSize
            );
          }, 50);
        } else {
          timeoutIdRef.current = null;
        }
      };

      filterIdeasAux(allIdeas, 0, FILTER_SIZE);
    },
    [filterFunction]
  );

  useEffect(() => {
    if (ideas) {
      filterIdeas(ideas);
    }
  }, [filterIdeas, ideas]);

  return (
    <IdeaContext.Provider
      value={{
        allIdeas: ideas,
        filteredIdeas: filteredIdeas,
        ideaFilter: ideaFilter,
        setIdeaFilter: setIdeaFilter,
        selectedIdea: selectedIdea,
        setSelectedIdea: setSelectedIdea,
      }}
    >
      <Outlet />
    </IdeaContext.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
