import { Trophy, Laptop, Award } from "lucide-react";

function CategoryCard({ type, title, description }) {

  const data = {
    hackathon: {
      icon: Trophy,
      iconColor: "text-[#f39b38]",
      bgColor: "bg-[#fff4e8]",
      pillColor: "bg-[#f4a04b]",
    },

    internship: {
      icon: Laptop,
      iconColor: "text-[#1575d1]",
      bgColor: "bg-[#eaf4ff]",
      pillColor: "bg-[#1877d3]",
    },

    competition: {
      icon: Award,
      iconColor: "text-[#8b45df]",
      bgColor: "bg-[#f4eaff]",
      pillColor: "bg-[#8750d8]",
    },
  };

  const item = data[type];
  const Icon = item.icon;

  return (
    <div className="bg-white border border-[#dce4ea] rounded-xl h-[78px] flex flex-col items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.08)]">

      <div className={`mb-1 ${item.iconColor}`}>
        <Icon size={17} />
      </div>

      <span
        className={`${item.pillColor} text-white text-[7px] font-semibold rounded-full px-3 py-1`}
      >
        {title}
      </span>

      <p className="text-[8px] text-[#697582] mt-1">
        {description}
      </p>

    </div>
  );
}

export default CategoryCard;