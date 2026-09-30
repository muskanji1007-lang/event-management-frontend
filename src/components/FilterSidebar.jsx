function FilterSidebar({ darkMode }) {
  const box = darkMode
    ? "bg-[#1B1F1C] border-[#303630]"
    : "bg-white border-[#DADAD4]";

  const text = darkMode
    ? "text-[#F1F3EF]"
    : "text-[#1E1E1C]";

  const muted = darkMode
    ? "text-[#9A9F9A]"
    : "text-[#6B6F6B]";

  return (
    <aside
      className={`w-full rounded-xl border p-4 lg:w-52 xl:w-56 ${box}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className={`text-sm font-semibold ${text}`}>
          ☷ Filters
        </h2>
      </div>


      <input
        type="text"
        placeholder="Search keywords, labs, roles..."
        className={`mb-5 w-full rounded-lg border px-3 py-2 text-[11px] outline-none ${
          darkMode
            ? "border-[#303630] bg-[#101310] text-white"
            : "border-[#DADAD4] bg-[#F5F5F2]"
        }`}
      />

      
      <div className="mb-5">
        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Opportunity Type
        </p>

        <div className="space-y-2">
          {[
            ["All Types",],
            ["Hackathons",],
            ["Internships", ],
            ["Workshops",],
            ["Competitions", ],
          ].map(([name, count], index) => (
            <label
              key={name}
              className={`flex cursor-pointer items-center justify-between text-xs ${text}`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={index < 3}
                  className="accent-[#1F4D3F]"
                />
                {name}
              </span>

              <span className={muted}>{count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Attendance Mode
        </p>

        <div className="flex gap-2">
          {["Online", "Hybrid", "Campus"].map((mode, index) => (
            <button
              key={mode}
              className={`rounded-md px-2.5 py-1.5 text-[10px] ${
                index === 0
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
            "+React",
            "C++",
            "Data Structures",
            "SQL",
          ].map((skill) => (
            <span
              key={skill}
              className={`rounded-md px-2 py-1 text-[10px] ${
                darkMode
                  ? "bg-[#252A26] text-[#9A9F9A]"
                  : "bg-[#F1F1ED] text-[#5F625F]"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>


      <div>
        <p className={`mb-3 text-[10px] font-semibold uppercase ${muted}`}>
          Eligibility Year
        </p>

        <div className="space-y-2">
          {[
            "1st Year ",
            "2nd Year",
            "3rd Year",
            "4th Year",
            "any Year",
          ].map((year, index) => (
            <label
              key={year}
              className={`flex items-center gap-2 text-[10px] ${text}`}
            >
              <input
                type="radio"
                name="year"
                defaultChecked={index === 0}
                className="accent-[#1F4D3F]"
              />
              {year}
            </label>
          ))}
        </div>
      </div>

    
      <div className="mt-5 flex gap-2">
        <button
          className={`flex-1 rounded-md px-2 py-2 text-[10px] ${
            darkMode
              ? "bg-[#303630] text-[#F1F3EF]"
              : "bg-[#EEEEEB] text-[#1E1E1C]"
          }`}
        >
          Clear
        </button>

        <button className="flex-1 rounded-md bg-[#8FD3B0] px-2 py-2 text-[10px] font-semibold text-[#0F1210]">
          Apply 
        </button>
      </div>
    </aside>
  );
}

export default FilterSidebar;