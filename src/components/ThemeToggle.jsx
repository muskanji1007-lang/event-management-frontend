function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      className={`rounded-lg border px-3 py-2 text-xs font-medium ${
        darkMode
          ? "border-[#303630] bg-[#1B1F1C] text-[#E5B869]"
          : "border-[#DADAD4] bg-white text-[#1F4D3F]"
      }`}
    >
      {darkMode ? "☀ Light" : "☾ Dark"}
    </button>
  );
}

export default ThemeToggle;