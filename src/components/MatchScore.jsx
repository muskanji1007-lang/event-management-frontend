
import { Target } from "lucide-react";

export default function MatchScore({ score, label = "Match Score" }) {
const validScore =
typeof score === "number" &&
Number.isFinite(score) &&
score >= 0 &&
score <= 100;

return ( <div className="inline-flex items-center gap-3 rounded-xl border border-[#D9DCD6] bg-[#EEEEEB] px-4 py-3"> <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F4D3F] text-white"> <Target size={20} /> </div>

```
  <div>
    <p className="text-sm text-[#6B6F6B]">{label}</p>
    <p className="text-lg font-bold text-[#1F4D3F]">
      {validScore ? `${score}%` : "Not available"}
    </p>
  </div>
</div>

);
}
