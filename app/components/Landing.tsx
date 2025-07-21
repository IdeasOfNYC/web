import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";
import BlockButton from "./Button";

export default function Landing() {
  return (
    <section className="flex flex-col items-center justify-center bg-neutral-50 h-screen relative pt-10 overflow-hidden">
      {/* nav area */}
      <div className="flex w-full px-4 justify-between items-center absolute top-2">
        <div className="flex flex-row w-96 items-center gap-1">
          <img src="image copy 2.png" className="h-15" alt="" />
          <div className="flex justify-start font-display font-bold">IoNYC</div>
        </div>

        {/* Center: Nav buttons */}
        <div className="flex-1 flex justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-3 border border-dotted rounded-md bg-white border-neutral-400 px-1 py-1 text-sm sm:text-base text-neutral-700 font-medium">
              <Link to="/about">
                <button className="px-3 py-1 hover:bg-neutral-100 rounded-sm">
                  About the Process
                </button>
              </Link>

              <Link to="/selected">
                <button className="px-3 py-1 hover:bg-neutral-100 rounded-sm">
                  Selected Ideas
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Link */}
        <div className="flex items-center justify-end min-w-[160px]">
          <a
            href="https://www.participate.nyc.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 hover:bg-neutral-100 rounded-sm flex items-center text-sm sm:text-base text-neutral-700 font-medium border border-dotted border-neutral-400 bg-white"
          >
            The People's Money
            <ExternalLinkIcon
              className="ml-2"
              width={16}
              height={16}
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
      {/* hero section with paper background */}
      <div className="relative w-full xl:max-w-[1100px] max-w-[900px] flex flex-col items-center justify-center pt-12">
        {/* paper */}
        <img
          src="/landingBackground.png"
          alt="landing background; three collage style cutouts of people on a paper with an earmark"
        />

        {/* main text with CTA */}
        <div className="absolute top-0 z-10 pt-36 flex flex-col xl:gap-16 gap-8 animate-fade-in">
          {/* intro text */}
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold leading-tight font-display mb-4">
              <span className="font-light">IDEAS</span> FOR NEW YORKERS
              <br />
              BY NEW YORKERS
            </h1>
            <p className="text-neutral-500 text-base">
              An interactive visualization of all ideas submitted to{" "}
              <i>The People's Money</i>,<br />
              NYC’s participatory budgeting program
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 flex-wrap pb-24">
            <Link to="/map">
              <BlockButton message="SEE LAST YEAR'S (2024) IDEAS →"></BlockButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
