import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <section className="flex flex-col items-center bg-neutral-50 h-screen relative pt-10 overflow-hidden">
      {/* nav area */}
      <div className="flex w-full px-4 justify-between items-center absolute top-2">
        <div className="flex flex-row w-96 items-center gap-1">
          <img src="image copy 2.png" className="h-15" alt="" />
          <div className="flex justify-start font-display font-bold">IoNYC</div>
        </div>

        <div className="flex justify-between px-4 text-sm border border-dotted rounded w-min bg-white border-neutral-400 gap-4 font-light text-neutral-600 group h-10">
          <button className="text-nowrap group-hover:text-neutral-700 hover:text-neutral-800 hover:font-normal">
            About the Process
          </button>
          <button className="text-nowrap group-hover:text-neutral-700 hover:text-neutral-800 hover:font-normal">
            FAQs
          </button>
          <button className="text-nowrap group-hover:text-neutral-700 hover:text-neutral-800 hover:font-normal">
            Selected Ideas
          </button>
        </div>

        <div className="w-96 flex justify-end items-center">
          <button className="text-nowrap text-sm flex justify-center items-center px-2 border border-dotted rounded w-min h-10 border-neutral-400 bg-white hover:bg-neutral-100 cursor-pointer">
            The People's Money
            <div className="flex flex-row p-2"></div>
            <ExternalLinkIcon
              strokeWidth={1.5}
              width={18}
              height={18}
            ></ExternalLinkIcon>
          </button>
        </div>
      </div>

      {/* hero section with paper background */}
      <div className="relative w-full xl:max-w-[1150px] max-w-[1000px] flex flex-col items-center justify-center xl:pt-8 pt-16">
        {/* paper */}
        <img
          src="/landingBackground.png"
          alt="landing background; three collage style cutouts of people on a paper with an earmark"
        />

        {/* main text with CTA */}
        <div className="absolute top-0 z-10 pt-36 flex flex-col gap-16 animate-fade-in">
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
              <button className="px-8 py-4 bg-green-100 border border-green-600  border-dashed font-semibold hover:bg-green-50 hover:border-green-500 rounded-md shadow shadow-green-400/15 font-display">
                SEE LAST YEAR’S (2024) IDEAS →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
