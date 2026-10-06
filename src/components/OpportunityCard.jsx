import {
  Bookmark,
  CalendarDays,
  MapPin,
} from "lucide-react";

function OpportunityCard({
  type,
  title,
  description,
  date,
  location,
  score,
  matched,
  missing,
  onViewDetails,
}) {
  const typeColor =
    type === "Hackathon"
      ? "bg-[var(--highlight)] text-[var(--text)]"
      : type === "Internship"
      ? "bg-[var(--accent)] text-white"
      : "bg-[var(--primary)] text-white";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:shadow-md">

            <div className="mb-4 flex items-start justify-between gap-3">

        <span
          className={ounded-full px-3 py-1 text-xs font-semibold \}
        >
          {type}
        </span>
        
        {score && (
          <span className="rounded-full bg-[#1F4D3F] px-2 py-1 text-xs font-bold text-[#8FD3B0]">
            {(score * 100).toFixed(0)}% Match
          </span>
        )}
      </div>

      <h2 className="text-lg font-bold text-[var(--text)] sm:text-xl">
        {title}
      </h2>

      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-muted)]">
        {description}
      </p>

      <div className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>

            </div>

      {matched && (
        <div className="mt-4 flex flex-wrap gap-2">
          {matched.split(',').map((skill, idx) => (
            <span key={"m"+idx} className="rounded border border-[#8FD3B0] bg-[#8FD3B0]/10 px-2 py-1 text-xs font-medium text-[#1F4D3F] dark:text-[#8FD3B0]">
              {skill.trim()}
            </span>
          ))}
          {missing && missing.split(',').map((skill, idx) => (
            <span key={"ms"+idx} className="rounded border border-[#D9DCD6] bg-[#F5F5F2] px-2 py-1 text-xs font-medium text-[#6B6F6B] dark:border-[#343A35] dark:bg-[#1B1F1C] dark:text-[#9A9F9A] opacity-60">
              {skill.trim()}
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onViewDetails}
        className="mt-auto pt-5"
      >
        <span className="block w-full rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
          View Details
        </span>
      </button>

    </article>
  );
}

export default OpportunityCard;
