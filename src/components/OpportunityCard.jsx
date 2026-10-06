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
          className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColor}`}
        >
          {type}
        </span>

        

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