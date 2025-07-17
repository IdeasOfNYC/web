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
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { type Borough, type Idea, type IdeaFilterFunction } from "./types";
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
  const [ideaFilterFunction, setIdeaFilterFunction] =
    useState<IdeaFilterFunction | null>(null);
  const [targetBorough, setTargetBorough] = useState<Borough | null>(null);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const manhattanIdeas = useMemo(
    () => ideas?.filter((idea) => idea.borough === "manhattan") || null,
    [ideas]
  );
  const brooklynIdeas = useMemo(
    () => ideas?.filter((idea) => idea.borough === "brooklyn") || null,
    [ideas]
  );
  const queensIdeas = useMemo(
    () => ideas?.filter((idea) => idea.borough === "queens") || null,
    [ideas]
  );
  const bronxIdeas = useMemo(
    () => ideas?.filter((idea) => idea.borough === "bronx") || null,
    [ideas]
  );
  const statenIslandIdeas = useMemo(
    () => ideas?.filter((idea) => idea.borough === "staten island") || null,
    [ideas]
  );

  const setFilter = (newFilter: IdeaFilterFunction) => {
    setIdeaFilterFunction(() => newFilter);
  };

  useEffect(() => {
    loadIdeas().then((ideas) => setIdeas(ideas));
  }, []);

  const filterIdeas = useCallback(
    (localIdeas: Idea[], filterFunction: IdeaFilterFunction) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      setFilteredIdeas(() => []);
      const FILTER_SIZE = 10;
      const filterIdeasAux = (
        innerIdeas: Idea[],
        index: number,
        filterGroupSize: number,
        filterFunction: IdeaFilterFunction
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
              filterGroupSize,
              filterFunction
            );
          }, 1000);
        } else {
          timeoutIdRef.current = null;
        }
      };

      filterIdeasAux(localIdeas, 0, FILTER_SIZE, filterFunction);
    },
    []
  );

  useEffect(() => {
    if (ideas) {
      let ideasToFilterFrom: Idea[] | null = ideas;

      switch (targetBorough) {
        case "manhattan":
          ideasToFilterFrom = manhattanIdeas;
          break;
        case "brooklyn":
          ideasToFilterFrom = brooklynIdeas;
          break;
        case "queens":
          ideasToFilterFrom = queensIdeas;
          break;
        case "bronx":
          ideasToFilterFrom = bronxIdeas;
          break;
        case "staten island":
          ideasToFilterFrom = statenIslandIdeas;
          break;
        default:
          ideasToFilterFrom = ideas; // Use all ideas if no borough is selected
      }

      if (ideasToFilterFrom) {
        if (ideaFilterFunction) {
          filterIdeas(ideasToFilterFrom, ideaFilterFunction);
        } else {
          setFilteredIdeas(ideasToFilterFrom);
        }
      } else {
        setFilteredIdeas(null); // If no ideas to filter from, set filteredIdeas to null
      }
    }
  }, [
    ideas,
    ideaFilterFunction,
    targetBorough,
    filterIdeas,
    manhattanIdeas,
    brooklynIdeas,
    queensIdeas,
    bronxIdeas,
    statenIslandIdeas,
  ]);

  useEffect(() => {
    console.log(targetBorough);
  }, [targetBorough]);

  return (
    <IdeaContext.Provider
      value={{
        ideas: filteredIdeas,
        setIdeaFilter: setFilter,
        targetBorough: targetBorough,
        setTargetBorough: (newBorough: Borough | "All") => {
          setTargetBorough(newBorough === "All" ? null : newBorough);
        },
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
