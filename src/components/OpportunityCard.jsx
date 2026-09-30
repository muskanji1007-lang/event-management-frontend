function OpportunityCard({ 
  type, 
  title, 
  description, 
  mode, 
  deadline,
  onViewDetails,
}) {
  return (
    <div className="rounded-2xl border border-[#E2E2DD] bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">

      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          type === "Hackathon"
            ? "bg-[#E8B84A] text-[#1E1E1C]"
            : type === "Internship"
            ? "bg-[#D9673B] text-white"
            : "bg-[#1F4D3F] text-white"
        }`}
      >
        {type}
      </span>


      <h2 className="mt-4 text-xl font-semibold text-[#1E1E1C]">
        {title}
      </h2>

    
      <p className="mt-2 text-sm leading-6 text-[#6B6F6B]">
        {description}
      </p>


      <div className="mt-5 space-y-2 text-sm text-[#6B6F6B]">
        <p>
          <span className="font-medium text-[#1E1E1C]">Mode:</span>{" "}
          {mode}
        </p>

        <p>
          <span className="font-medium text-[#1E1E1C]">Deadline:</span>{" "}
          {deadline}
        </p>
      </div>

    
      <button
        type="button"
          onClick={onViewDetails}
        className="mt-6 w-full rounded-xl bg-[#1F4D3F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#173B31]"
      >
        View Details
      </button>
    </div>
  );
}

export default OpportunityCard;