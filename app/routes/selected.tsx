import { Link } from "react-router";

export default function SelectedIdeas() {
  const projects = [
    "Mothers Matter",
    "Youth Empowerment Afterschool Workshops",
    "Restorative Justice Education for Youth",
    "College Prep and Career Readiness for Youth",
    "Connectivity Program for Seniors",
    "Youth Activity and Enrichment Program with the Arts",
    "Home Repair Liaisons for Older Adults",
    "Healthy Meals Partnership",
    "Errands for Older Adults and People with Disabilities",
    "Path to Success: Positive Money Habits",
    "Language and Job Recertification Information for Immigrants",
    "Job Training for Young Adults and Adults in Trade Work",
    "Creative Mental Wellness Program for Families with Children",
    "Resource Outreach for People with Disabilities",
    "Connection Resource Center",
    "Life Prep for High School Students 101",
    "Slashing Bronx Hunger and Boosting Knowledge About Healthy Eating",
    "Self-Defense Education for Women",
    "Building Success for High School Students",
  ];

  return (
    <section className="min-h-screen bg-neutral-50 text-neutral-800 px-6 sm:px-12 pt-28 pb-20 max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold font-display mb-10 text-center uppercase">
        Selected Ideas
      </h1>

      <p className="text-lg sm:text-xl mb-10 text-center max-w-3xl mx-auto text-neutral-600 font-light">
        Explore a curated collection of ideas that advanced through the <i>People’s Money</i> process.
        These ideas made it to the final stages and reflect the community’s priorities.
      </p>

      <div className="space-y-12 font-light text-base sm:text-lg leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">What Is a "Selected" Idea?</h2>
          <p>
            Ideas selected for final voting or funding have passed through community review,
            feasibility checks, and met budget criteria. These are the ideas New Yorkers deemed
            most impactful.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">Categories of Selected Ideas</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Public safety initiatives like better lighting or safer crosswalks</li>
            <li>Educational improvements, including supplies and technology upgrades</li>
            <li>Health and wellness services such as mobile clinics or access programs</li>
            <li>Community enhancements like murals, gardens, or libraries</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">2023–2024 Funded Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((title, idx) => (
              <div
                key={idx}
                className="border border-neutral-200 bg-white p-4 rounded shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-green-700 font-medium">Project Underway</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold font-display mb-2 uppercase">Next Steps</h2>
          <p>
            After selection, city agencies implement winning ideas with community updates.
            You can follow progress and updates on the <a href="https://www.participate.nyc.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">official NYC PB site</a>.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link to="/">
          <button className="px-6 py-3 bg-green-100 border border-green-600 border-dashed font-semibold hover:bg-green-50 hover:border-green-500 rounded-md shadow font-display uppercase">
            ← Back To Home
          </button>
        </Link>
      </div>
    </section>
  );
}