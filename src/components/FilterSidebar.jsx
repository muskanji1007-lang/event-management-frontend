import { useState } from "react";

function FilterSidebar({ darkMode }) {
  const [types, setTypes] = useState({
    Hackathons: true,
    Internships: true,
    Workshops: false,
    Competitions: false,
  });

  const [attendance, setAttendance] = useState("Online");
  const [year, setYear] = useState("2nd Year");

  const box = darkMode
    ? "bg-[#1B1F1C] border-[#303630]"
    : "bg-[#EEEEEB] border-[#DADAD4]";

  const text = darkMode
    ? "text-[#F1F3EF]"
    : "text-[#1E1E1C]";

  const muted = darkMode
    ? "text-[#9A9F9A]"
    : "text-[#6B6F6B]";

  const toggleType = (name) => {
    setTypes((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const clearFilters = () => {
    setTypes({
      Hackathons: false,
      Internships: false,
      Workshops: false,
      Competitions: false,
    });

    setAttendance("");
    setYear("");
  };

  return (
    <aside
      className={`w-full shrink-0 rounded-xl border p-4 lg:w-56 ${box}`}
    >

      <div className="mb-5 flex items-center justify-between">
        <h2 className={`text-sm font-semibold ${text}`}>
          ☷ Filters
        </h2>
      </div>

      <div className="mb-5">

        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Opportunity Type
        </p>

        <div className="space-y-3">

          {Object.keys(types).map((name) => (
            <label
              key={name}
              className={`flex cursor-pointer items-center gap-2 text-xs ${text}`}
            >
              <input
                type="checkbox"
                checked={types[name]}
                onChange={() => toggleType(name)}
                className="accent-[#1F4D3F]"
              />

              {name}
            </label>
          ))}

        </div>
      </div>

      <div className="mb-5">

        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Attendance Mode
        </p>

        <div className="flex flex-wrap gap-2">

          {["Online", "Hybrid", "Campus"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setAttendance(mode)}
              className={`rounded-md px-2.5 py-1.5 text-[10px] ${
                attendance === mode
                  ? "bg-[#1F4D3F] text-white"
                  : darkMode
                  ? "bg-[#252A26] text-[#9A9F9A]"
                  : "bg-[#F1F1ED] text-[#5F625F]"
              }`}
            >
              {mode}
            </button>
          ))}

        </div>
      </div>

      <div className="mb-5">

        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Skills & Frameworks
        </p>

        <div className="flex flex-wrap gap-1.5">

          {[
            "Python",
            "ML",
            "React",
            "C++",
            "Data Structures",
            "SQL",
          ].map((skill) => (
            <button
              type="button"
              key={skill}
              className={`rounded-md px-2 py-1 text-[10px] ${
                darkMode
                  ? "bg-[#252A26] text-[#9A9F9A]"
                  : "bg-[#F1F1ED] text-[#5F625F]"
              }`}
            >
              {skill}
            </button>
          ))}

        </div>
      </div>

      <div>

        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Eligibility Year
        </p>

        <div className="space-y-2">

          {[
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
          ].map((item) => (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-2 text-[10px] ${text}`}
            >
              <input
                type="radio"
                name="year"
                value={item}
                checked={year === item}
                onChange={() => setYear(item)}
                className="accent-[#1F4D3F]"
              />

              {item}
            </label>
          ))}

        </div>
      </div>

      <div className="mt-5 flex gap-2">

        <button
          type="button"
          onClick={clearFilters}
          className={`flex-1 rounded-md px-2 py-2 text-[10px] ${
            darkMode
              ? "bg-[#303630] text-[#F1F3EF]"
              : "bg-[#EEEEEB] text-[#1E1E1C]"
          }`}
        >
          Clear
        </button>

        <button
          type="button"
          onClick={() => alert("Filters applied.")}
          className="flex-1 rounded-md bg-[#8FD3B0] px-2 py-2 text-[10px] font-semibold text-[#0F1210]"
        >
          Apply
        </button>

      </div>

    </aside>
  );
}

export default FilterSidebar;