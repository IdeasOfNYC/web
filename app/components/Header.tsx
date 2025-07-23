// components/Header.tsx
import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <div className="flex w-full px-4 items-center py-2 relative">
      {/* Left: Logo */}
      <div className="flex flex-row w-96 items-center gap-1">
        <img src="image copy 2.png" className="h-15" alt="" />
        <div className="flex justify-start font-display font-bold">IoNYC</div>
      </div>

      {/* Center: Nav buttons */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex gap-3 border border-dotted rounded-md bg-white border-neutral-400 px-1 py-1 text-sm sm:text-base text-neutral-700 font-medium">
          <Link to="/">
            <button className="px-3 py-1 hover:bg-neutral-100 rounded-sm">
              Home
            </button>
          </Link>

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

      {/* Right: External Link */}
      <div className="flex items-center justify-end min-w-[160px] ml-auto">
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
  );
}