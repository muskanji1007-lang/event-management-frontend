import { useState } from "react";
import { Search, Check } from "lucide-react";

function Skills({ onNext }) {
  const [search, setSearch] = useState("");

  const [selectedSkills, setSelectedSkills] = useState([
    "Python",
    "Machine Learning",
  ]);

  const skills = [
    "Python",
    "Java",
    "C++",
    "Machine Learning",
    "Web Dev",
    "Data Analysis",
    "UI/UX",
    "Android Dev",
    "Cloud Computing",
    "Cyber Security",
    "Content Writing",
    "Artificial Intelligence",
    "Poster",
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((item) => item !== skill)
      );
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050b1a] px-5 py-6 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">

        
        <div>
          <h1 className="text-xl font-semibold">
            Select your skills
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Choose skills that best describe you
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
            placeholder="Search skills..."
            className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-gray-500"
          />
        </div>

        
        <h2 className="mt-5 text-base font-semibold">
          Popular
        </h2>


        <div className="mt-4 flex flex-wrap gap-3">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);

            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-[#09294b] text-white"
                }`}
              >
                {isSelected && <Check size={16} />}
                {skill}
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

export default Skills;