// app/routes/about.tsx
import { Link } from "react-router";

export default function About() {
  return (
    <section className="min-h-screen bg-neutral-50 text-neutral-800 px-6 sm:px-12 pt-28 pb-20 max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold font-display mb-6 text-center">
        About the Process
      </h1>

      <p className="text-lg sm:text-xl mb-10 text-center max-w-3xl mx-auto text-neutral-600 font-light">
        <i>The People’s Money</i> is NYC’s annual citywide participatory budgeting process, giving New Yorkers a direct voice in how part of the city budget is spent.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <img src="/example1.png" alt="Community meeting" className="w-72 h-48 object-cover rounded-md shadow" />
        <img src="/example2.png" alt="Youth engagement" className="w-72 h-48 object-cover rounded-md shadow" />
        <img src="/example3.png" alt="Voting event" className="w-72 h-48 object-cover rounded-md shadow" />
      </div>

      <div className="space-y-12 font-light text-base sm:text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold font-display mb-2">What Is It?</h2>
          <p>
            Participatory budgeting (PB) lets New Yorkers decide how to spend public funds on projects in their communities. Residents propose ideas, develop them with city agencies, and vote to decide what gets funded.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2">Who Can Participate?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All New Yorkers age 11 and up</li>
            <li>Regardless of immigration status</li>
            <li>No ID or citizenship required</li>
          </ul>
          <p className="mt-2">
            Everyone is encouraged to get involved, whether that's by submitting ideas, volunteering as a budget delegate, or helping spread the word.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Idea Collection:</strong> Residents submit ideas that address local needs.</li>
            <li><strong>Proposal Development:</strong> City staff and community volunteers vet ideas for feasibility and cost.</li>
            <li><strong>Voting:</strong> All eligible New Yorkers vote on proposals.</li>
            <li><strong>Funding:</strong> The top projects are funded by the city budget and tracked through implementation.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2">Timeline</h2>
          <p>Each cycle follows this general structure:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Fall:</strong> Idea submission</li>
            <li><strong>Winter:</strong> Proposal development</li>
            <li><strong>Spring:</strong> Citywide voting</li>
            <li><strong>Summer:</strong> Winning projects announced</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2">Why It Matters</h2>
          <p>
            <i>The People’s Money</i> empowers communities, especially those historically excluded from decision-making. It’s a tool for equity, civic learning, and transparency, which ensures public funds address the needs and ideas of real New Yorkers.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link to="/">
          <button className="px-6 py-3 bg-green-100 border border-green-600 border-dashed font-semibold hover:bg-green-50 hover:border-green-500 rounded-md shadow font-display">
            ← Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
}
