import { Link } from "react-router";
import Header from "~/components/Header";

export default function About() {
  return (
      <div className="bg-neutral-50 min-h-screen">
      <Header />
    <section className="min-h-screen bg-neutral-50 text-neutral-800 px-6 sm:px-12 pt-28 pb-20 max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6 text-center uppercase">
        ABOUT THE PROCESS
      </h1>

<p className="text-lg sm:text-xl mb-10 text-center max-w-3xl mx-auto text-neutral-600 font-light">
        <i>The People’s Money</i> is NYC’s annual citywide participatory budgeting process, giving New Yorkers a direct voice in how part of the city budget is spent.
      </p>

      <div className="space-y-16 font-light text-base sm:text-lg leading-relaxed">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">What Is It?</h2>
          <p>
            Participatory budgeting (PB) lets New Yorkers decide how to spend public funds on projects in their communities. Residents propose ideas, develop them with city agencies, and vote to decide what gets funded.
          </p>
          <iframe className="w-full h-64 rounded shadow" src="https://www.youtube.com/embed/OVqXVu07kIU" title="What is PB" allowFullScreen></iframe>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">Who Can Participate?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All New Yorkers age 11 and up</li>
            <li>Regardless of immigration status</li>
            <li>No ID or citizenship required</li>
          </ul>
          <p>
            Everyone is encouraged to get involved, whether that's by submitting ideas, volunteering as a budget delegate, or helping spread the word.
          </p>
          <iframe className="w-full h-64 rounded shadow" src="https://www.youtube.com/embed/zZjIY2fzXNI" title="Who Can Participate" allowFullScreen></iframe>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Idea Collection:</strong> Residents submit ideas that address local needs.</li>
            <li><strong>Proposal Development:</strong> City staff and community volunteers vet ideas for feasibility and cost.</li>
            <li><strong>Voting:</strong> All eligible New Yorkers vote on proposals.</li>
            <li><strong>Funding:</strong> The top projects are funded by the city budget and tracked through implementation.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">Timeline</h2>
          <p>Each cycle follows this general structure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Fall:</strong> Idea submission</li>
            <li><strong>Winter:</strong> Proposal development</li>
            <li><strong>Spring:</strong> Citywide voting</li>
            <li><strong>Summer:</strong> Winning projects announced</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">Why It Matters</h2>
          <p>
            <i>The People’s Money</i> empowers communities, especially those historically excluded from decision-making. It’s a tool for equity, civic learning, and transparency, which ensures public funds address the needs and ideas of real New Yorkers.
          </p>
          <iframe className="w-full h-64 rounded shadow" src="https://www.youtube.com/embed/iyEK1g36PYI" title="Why It Matters" allowFullScreen></iframe>
        </div>
      </div>

    </section>
      </div>
  );
}