import { Link } from "react-router";
import BlockButton from "./Button";
import Header from "~/components/Header";

export default function Landing() {
  return (
    <section className="flex flex-col items-center justify-center bg-neutral-50 h-screen relative pt-10 overflow-hidden">
<div className="absolute top-2 w-full z-20">
  <Header />
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
