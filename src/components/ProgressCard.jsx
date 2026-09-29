function ProgressCard() {
  return (
    <div className="bg-white border border-[#dce4ea] rounded-xl p-3 shadow-sm">

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-[10px] font-bold text-[#263442]">
          Your Progress
        </h2>

        <button className="text-[7px] text-[#1474d1]">
          View Details →
        </button>

      </div>

      <div className="grid grid-cols-3 gap-1.5">

        <div className="bg-[#e8f1fc] rounded-md py-2 text-center">
          <p className="text-[17px] font-bold text-[#1773d1]">
            3
          </p>
          <p className="text-[6px] text-[#76828e]">
            Registered
          </p>
        </div>

        <div className="bg-[#e8f1fc] rounded-md py-2 text-center">
          <p className="text-[17px] font-bold text-[#1773d1]">
            2
          </p>
          <p className="text-[6px] text-[#76828e]">
            Completed
          </p>
        </div>

        <div className="bg-[#e8f1fc] rounded-md py-2 text-center">
          <p className="text-[17px] font-bold text-[#1773d1]">
            1
          </p>
          <p className="text-[6px] text-[#76828e]">
            Upcoming
          </p>
        </div>

      </div>

    </div>
  );
}

export default ProgressCard;