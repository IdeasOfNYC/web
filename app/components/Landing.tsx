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

        {/* Center: Nav buttons */}
        <div className="flex-1 flex justify-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex gap-3 border border-dotted rounded bg-white border-neutral-400 px-4 py-1 text-base sm:text-lg text-neutral-600 font-light">
              <button className="hover:text-neutral-800">
                About the Process
              </button>
              <button className="hover:text-neutral-800">FAQs</button>
              <button className="hover:text-neutral-800">Selected Ideas</button>
            </div>
          </div>
        </div>

        {/* Right: Link */}
        <div className="flex items-center justify-end min-w-[160px]">
          <button className="text-base sm:text-lg flex items-center border border-dotted rounded border-neutral-400 bg-white px-3 py-1 hover:bg-neutral-100">
            The People's Money
            <ExternalLinkIcon
              className="ml-2"
              width={18}
              height={18}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-28 sm:pt-32 w-full flex flex-col items-center">
        <div className="relative w-full max-w-[1000px] flex flex-col items-center px-4">
          {/* Background image */}
          <img
            src="/landingBackground.png"
            alt="collage background"
            className="w-full h-auto object-cover sm:object-contain max-w-none"
          />

          {/* Overlay content */}
          <div className="absolute top-8 sm:top-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center gap-8 sm:gap-12 animate-fade-in w-full px-4">
            <div className="w-full max-w-[600px] px-4 sm:px-0">
              <h1 className="text-2xl sm:text-4xl font-bold leading-snug font-display mb-4">
                <span className="font-light">IDEAS</span> FOR NEW YORKERS
                <br />
                <span className="font-light">BY NEW YORKERS</span>
              </h1>
              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed sm:leading-loose break-words max-w-[90vw] sm:max-w-[600px]">
                An interactive visualization of all ideas submitted to{" "}
                <i>The People's Money</i>, NYC’s participatory budgeting program
              </p>
            </div>

            <Link to="/map">
              <button className="px-6 sm:px-8 py-3 bg-green-100 border border-green-600 border-dashed font-semibold hover:bg-green-50 hover:border-green-500 rounded-md shadow font-display text-sm sm:text-base">
                SEE LAST YEAR’S (2024) IDEAS →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
