import { useState } from "react";
import { Search, Check } from "lucide-react";

function Interests({ onNext }) {
  const [search, setSearch] = useState("");

  const [selectedInterests, setSelectedInterests] = useState([
    "Hackathons",
    "Workshops",
  ]);

  const interests = [
    "Hackathons",
    "Workshops",
    "Internships",
    "Competitions",
    "Coding",
    "Design",
    "Business",
    "AI & ML",
    "Data Science",
    "Web Development",
    "Mobile Development",
    "Cyber Security",
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const filteredInterests = interests.filter((interest) =>
    interest.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050b1a] px-5 py-6 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">


        <div>
          <h1 className="text-xl font-semibold">
            What interests you?
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Select topics you are interested in
          </p>

          <p className="text-sm text-gray-400">
            (multi-select)
          </p>
        </div>

    
        <div className="mt-6 flex items-center rounded-xl bg-[#09294b] px-4">
          <Search size={22} className="text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interests..."
            className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-500"
          />
        </div>

    
        <h2 className="mt-5 text-base font-semibold">
          Popular
        </h2>

        
        <div className="mt-4 flex flex-wrap gap-3">
          {filteredInterests.map((interest) => {
            const isSelected = selectedInterests.includes(interest);

            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-[#09294b] text-white"
                }`}
              >
                {isSelected && <Check size={16} />}
                {interest}
              </button>
            );
          })}
        </div>

    
        <div className="mt-auto pt-10">
          <button
            onClick={onNext}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-blue-500 py-4 text-lg font-medium transition hover:bg-blue-600 active:scale-[0.98]"
          >
            Next
            <span className="text-2xl">→</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Interests;