import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { SplitViewer } from "~/components/SplitViewer";
import { IdeaContext } from "~/context/IdeaContext";
import { BOROUGHS, type Borough, type Idea } from "~/types";

interface Midpoint {
  x: number;
  y: number;
  name: Borough;
}

const Map = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statenIslandRef = useRef<SVGPathElement>(null);
  const brooklynRef = useRef<SVGPathElement>(null);
  const queensRef = useRef<SVGPathElement>(null);
  const manhattanRef = useRef<SVGPathElement>(null);
  const bronxRef = useRef<SVGPathElement>(null);

  const [midpoints, setMidpoints] = useState<Midpoint[]>([]);

  const [categorization, setCategorization] = useState<"stage" | "impact">(
    "stage"
  );

  const [selectedIdeas, setSelectedIdeas] = useState<Idea[] | null>(null);

  const { ideaFilter, setIdeaFilter, filteredIdeas, allIdeas } =
    useContext(IdeaContext);

  const boroughs: { name: Borough; ref: RefObject<SVGPathElement | null> }[] =
    useMemo(
      () => [
        { name: "staten island", ref: statenIslandRef },
        { name: "brooklyn", ref: brooklynRef },
        { name: "queens", ref: queensRef },
        { name: "manhattan", ref: manhattanRef },
        { name: "bronx", ref: bronxRef },
      ],
      []
    );

  useEffect(() => {
    const calculateMidpoints = () => {
      const newMidpoints: Midpoint[] = [];

      const svgElement = svgRef.current;
      if (!svgElement) return;

      const parentRect = svgElement.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const ctm = svgElement.getScreenCTM();
      if (!ctm) return;

      boroughs.forEach((borough) => {
        if (borough.ref.current) {
          const bbox = borough.ref.current.getBBox();
          const svgMidX = bbox.x + bbox.width / 2;
          const svgMidY = bbox.y + bbox.height / 2;

          // Create an SVGPoint for the midpoint in SVG coordinates
          const svgPoint = svgElement.createSVGPoint();
          svgPoint.x = svgMidX;
          svgPoint.y = svgMidY;

          // Transform the SVGPoint to screen coordinates
          const screenPoint = svgPoint.matrixTransform(ctm);

          // Calculate coordinates relative to the parent div
          const x = screenPoint.x - parentRect.left;
          const y = screenPoint.y - parentRect.top;

          newMidpoints.push({ x, y, name: borough.name });
        }
      });
      setMidpoints(newMidpoints);
    };

    calculateMidpoints();
    const observer = new ResizeObserver(() => {
      calculateMidpoints();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [boroughs]);

  const statenIslandIdeas = useMemo(
    () =>
      (filteredIdeas ?? []).filter((idea) => idea.borough === "staten island"),
    [filteredIdeas]
  );
  const brooklynIdeas = useMemo(
    () => (filteredIdeas ?? []).filter((idea) => idea.borough === "brooklyn"),
    [filteredIdeas]
  );
  const queensIdeas = useMemo(
    () => (filteredIdeas ?? []).filter((idea) => idea.borough === "queens"),
    [filteredIdeas]
  );
  const manhattanIdeas = useMemo(
    () => (filteredIdeas ?? []).filter((idea) => idea.borough === "manhattan"),
    [filteredIdeas]
  );
  const bronxIdeas = useMemo(
    () => (filteredIdeas ?? []).filter((idea) => idea.borough === "bronx"),
    [filteredIdeas]
  );

  useEffect(() => {
    if (ideaFilter.borough) {
      switch (ideaFilter.borough) {
        case "staten island":
          setSelectedIdeas(statenIslandIdeas);
          break;
        case "brooklyn":
          setSelectedIdeas(brooklynIdeas);
          break;
        case "queens":
          setSelectedIdeas(queensIdeas);
          break;
        case "manhattan":
          setSelectedIdeas(manhattanIdeas);
          break;
        case "bronx":
          setSelectedIdeas(bronxIdeas);
          break;
        default:
          setSelectedIdeas(null);
      }
    } else {
      setSelectedIdeas(null);
    }
  }, [
    ideaFilter.borough,
    statenIslandIdeas,
    brooklynIdeas,
    queensIdeas,
    manhattanIdeas,
    bronxIdeas,
  ]);

  return (
    <div
      className="w-full h-full flex items-center justify-center relative"
      ref={containerRef}
    >
      <div className="absolute bottom-8 right-8 flex flex-col gap-2">
        {selectedIdeas ? <SplitViewer ideas={selectedIdeas} /> : <></>}
        <SplitViewer ideas={allIdeas ? allIdeas : []} showLabels={true} />
      </div>
      {ideaFilter.borough === null ? (
        midpoints.map((midpoint) => (
          <div
            key={midpoint.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${midpoint.x}px`,
              top: `${midpoint.y}px`,
            }}
            title={midpoint.name}
          >
            {midpoint.name === "staten island" && (
              <SplitViewer ideas={statenIslandIdeas} />
            )}
            {midpoint.name === "brooklyn" && (
              <SplitViewer ideas={brooklynIdeas} />
            )}
            {midpoint.name === "queens" && <SplitViewer ideas={queensIdeas} />}
            {midpoint.name === "manhattan" && (
              <SplitViewer ideas={manhattanIdeas} />
            )}
            {midpoint.name === "bronx" && <SplitViewer ideas={bronxIdeas} />}
          </div>
        ))
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-1/2 bg-blue-300 w-32 h-32">
          {}
        </div>
      )}

      <div className="absolute w-full top-2 left-0 flex  justify-center items-center">
        <span className="flex gap-2 items-center border border-dotted border-neutral-300 p-1">
          <p>Ideas by</p>
          <select
            className="w-min p-2 border border-neutral-200 bg-white"
            value={categorization}
            onChange={(e) =>
              setCategorization(e.target.value as "stage" | "impact")
            }
          >
            <option value="stage">Stage</option>
            <option value="impact">Impact</option>
          </select>
          <p>from</p>
          <select
            className="w-min p-2 border border-neutral-200 bg-white"
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
        </span>
      </div>
      <svg
        ref={svgRef}
        width="687"
        height="686"
        viewBox="0 0 687 686"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* staten island */}
        <path
          ref={statenIslandRef}
          d="M35.217 584.524L16.8468 600.806C15.9903 601.565 15.5 602.655 15.5 603.8V643.861C15.5 644.605 15.2921 645.335 14.8996 645.968L1.67056 667.306C0.691906 668.884 0.928479 670.928 2.24174 672.242L13.6403 683.64C14.769 684.769 16.4608 685.119 17.9445 684.53L81 659.5L150.912 627.271C151.302 627.091 151.659 626.851 151.972 626.557L199 582.5L257.971 514.828C259.167 513.456 259.286 511.451 258.262 509.948L236.873 478.547C236.626 478.185 236.44 477.784 236.323 477.362L224.584 434.921C223.988 432.766 221.742 431.518 219.598 432.15L138.593 456.03C137.573 456.331 136.476 456.213 135.543 455.703L106.641 439.897C105.601 439.329 104.362 439.25 103.259 439.684L79.5374 449.003C78.0067 449.605 77 451.082 77 452.726V511.463C77 512.143 76.8268 512.812 76.4966 513.406L67.3292 529.907C67.1113 530.3 66.9609 530.726 66.8844 531.168L58.2508 581.051C58.0889 581.986 57.5995 582.834 56.8702 583.442L51.2704 588.108C49.921 589.233 47.9958 589.345 46.5246 588.386L40.0553 584.167C38.5462 583.182 36.5653 583.328 35.217 584.524Z"
          className="stroke-neutral-400"
        />
        {/* brooklyn */}
        <path
          ref={brooklynRef}
          d="M277.331 506.963L266.913 475.258C266.645 474.441 266.647 473.56 266.919 472.744L277.655 440.535C277.881 439.857 278.284 439.253 278.823 438.784L306.43 414.738C307.911 413.448 308.237 411.274 307.199 409.607L294.54 389.276C293.402 387.448 293.915 385.047 295.701 383.844L315.852 370.273C316.596 369.772 317.15 369.036 317.425 368.183L326.106 341.272C326.639 339.62 328.177 338.5 329.913 338.5H349.714C351.131 338.5 352.441 337.751 353.160 336.531L367.792 311.702C368.25 310.924 368.432 310.013 368.307 309.118L365.981 292.444C365.705 290.469 366.926 288.593 368.843 288.045L377.68 285.52C378.832 285.191 380.071 285.395 381.056 286.077L410.615 306.541C411.501 307.154 412.102 308.099 412.282 309.16L416.332 333.011C416.442 333.66 416.711 334.272 417.114 334.793L448.804 375.668C450.054 377.28 452.316 377.693 454.056 376.627L477.171 362.46C479.526 361.016 482.601 362.338 483.174 365.041L497.564 432.942C497.837 434.23 497.458 435.571 496.552 436.526L452.794 482.61C451.704 483.759 451.394 485.443 452.004 486.905L472.907 536.986C473.946 539.475 472.275 542.257 469.591 542.51L406 548.5L322.57 564.791C321.869 564.928 321.145 564.875 320.472 564.637L307.169 559.942C305.569 559.377 304.5 557.866 304.5 556.17V552.5C304.5 550.291 306.291 548.5 308.5 548.5H326.992C329.848 548.5 331.784 545.592 330.682 542.957L322.251 522.795C321.777 521.662 320.808 520.809 319.624 520.483L280.067 509.57C278.776 509.214 277.749 508.235 277.331 506.963Z"
          className="stroke-neutral-400"
        />
        {/* queens */}
        <path
          ref={queensRef}
          d="M400.032 228.815L373.5 275L373.259 275.333C371.093 278.332 373.809 282.411 377.411 281.571L380.337 280.888C381.399 280.64 382.517 280.837 383.431 281.433L415.039 302.047C415.971 302.655 416.607 303.623 416.796 304.718L421.331 331.021C421.442 331.664 421.708 332.270 422.107 332.786L449.759 368.598C451.027 370.240 453.340 370.640 455.086 369.52L480.641 353.119C482.992 351.610 486.126 352.914 486.712 355.645L503.949 435.932C504.283 437.491 505.512 438.702 507.075 439.015L513.096 440.219C514.004 440.401 514.946 440.262 515.763 439.826L535.493 429.303C536.456 428.790 537.586 428.692 538.622 429.032L627.358 458.134C628.946 458.654 630.691 458.133 631.733 456.826L654.628 428.094C655.193 427.386 655.5 426.507 655.5 425.601V315.041C655.5 313.490 656.396 312.079 657.8 311.42L678.115 301.885C679.297 301.330 680.133 300.234 680.357 298.949L685.601 268.797C685.847 267.377 685.312 265.935 684.199 265.02L634.321 224.049C632.202 222.309 628.999 223.168 628.037 225.736L624.049 236.368C622.850 239.566 618.453 239.887 616.802 236.897L595.437 198.197C594.845 197.125 593.795 196.384 592.587 196.184L535.529 186.753C534.545 186.590 533.536 186.801 532.7 187.343L500.036 208.531C498.312 209.649 497.716 211.891 498.656 213.717L513.209 241.992C513.983 243.496 513.727 245.324 512.571 246.558L509.219 250.133C507.926 251.513 505.843 251.798 504.226 250.817L434.176 208.32C432.848 207.515 431.174 207.550 429.882 208.412L401.282 227.479C400.768 227.822 400.340 228.279 400.032 228.815Z"
          className="stroke-neutral-400"
        />
        {/* manhattan */}
        <path
          ref={manhattanRef}
          d="M424.75 69.1225L409.478 60.2983C407.376 59.0837 404.685 60.0068 403.771 62.2563L386.294 105.276C386.1 105.754 386 106.265 386 106.781V116.428C386 117.130 385.815 117.820 385.464 118.429L300.946 264.727C300.652 265.236 300.474 265.804 300.424 266.389L294.137 340.392C294.049 341.423 294.365 342.449 295.018 343.253L299.299 348.522C300.059 349.457 301.199 350 302.404 350H313.31C314.937 350 316.401 349.015 317.015 347.509L320.672 338.534C321.188 337.267 322.315 336.352 323.660 336.107L346.013 332.043C347.779 331.722 349.114 330.264 349.280 328.477L353.892 278.664C353.963 277.904 354.249 277.180 354.718 276.577L388.157 233.583C388.704 232.881 389 232.017 389 231.128V217.72C389 216.925 389.237 216.148 389.681 215.488L406.754 190.096C407.780 188.571 407.634 186.543 406.401 185.18L400.034 178.143C399.368 177.407 399 176.451 399 175.459V130.437C399 129.821 399.142 129.213 399.416 128.66L426.333 74.3625C427.270 72.4718 426.578 70.1782 424.75 69.1225Z"
          className="stroke-neutral-400"
        />
        {/* bronx */}
        <path
          ref={bronxRef}
          d="M410.089 50.4335L426.608 3.92032C427.368 1.78053 429.754 0.701735 431.863 1.54506L482.563 21.8254C484.285 22.5138 486.253 21.9295 487.320 20.4134L492.997 12.346C494.146 10.7142 496.321 10.1782 498.096 11.0897L512.335 18.4018C513.092 18.7905 513.705 19.4103 514.086 20.1712L520.625 33.2502C521.177 34.3542 522.208 35.1416 523.418 35.3837L538.691 38.4383C538.897 38.4794 539.099 38.5365 539.295 38.6092L584.976 55.5111C587.151 56.3160 588.188 58.7963 587.233 60.9099L567.963 103.55C566.790 106.146 563.355 106.718 561.404 104.642L551.135 93.7185C548.417 90.8269 543.601 93.2316 544.280 97.1418L550.430 132.598C550.477 132.865 550.550 133.127 550.650 133.38L563.057 164.876C563.346 165.609 563.845 166.240 564.492 166.691L579.275 176.994C579.729 177.311 580 177.830 580 178.384C580 179.612 578.734 180.432 577.613 179.93L565.5 174.5L548.018 166.679C547.046 166.244 545.942 166.215 544.948 166.597L534.456 170.632C533.829 170.874 533.272 171.269 532.838 171.782L528.490 176.921C528.166 177.304 527.774 177.622 527.333 177.859L526.001 178.576C523.713 179.808 520.876 178.565 520.230 176.048L517.939 167.112C517.244 164.401 514.051 163.223 511.762 164.834L505.472 169.26C504.009 170.290 503.408 172.165 503.999 173.853L504.941 176.546C505.757 178.878 504.285 181.385 501.851 181.809L498.812 182.337C496.687 182.707 494.651 181.324 494.211 179.212L493.163 174.184C492.777 172.329 491.142 171 489.247 171H488.383C486.661 171 485.133 172.102 484.588 173.735L482.412 180.265C481.867 181.898 480.339 183 478.617 183H462.944C462.323 183 461.711 182.855 461.155 182.578L453.171 178.586C451.837 177.919 450.242 178.049 449.035 178.925L432.552 190.875C431.571 191.586 430.320 191.815 429.151 191.496L415.608 187.802C414.884 187.605 414.230 187.208 413.721 186.656L403.561 175.649C402.879 174.910 402.5 173.942 402.5 172.936V131.478C402.5 130.836 402.655 130.202 402.952 129.632L432.772 72.3203C433.745 70.4520 433.101 68.1498 431.302 67.0559L411.781 55.1902C410.161 54.2057 409.455 52.2196 410.089 50.4335Z"
          className="stroke-neutral-400"
        />
      </svg>
    </div>
  );
};

export default Map;
