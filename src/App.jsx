import { useState } from "react";

import Navbar from "./components/Navbar";
import FilterSidebar from "./components/FilterSidebar";
import OpportunityCard from "./components/OpportunityCard";
import OpportunityDetails from "./pages/Profile/Opportunity/OpportunityDetails";
function App() {
    const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return <OpportunityDetails />;
  }
  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#1E1E1C]">

      
      <Navbar />

  
      <main className="px-6 py-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1F4D3F]">
            Explore Opportunities
          </h1>

          <p className="mt-2 text-[#6B6F6B]">
            Discover opportunities that match your interests and goals.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex gap-8">

          {/* Left Filters */}
          <FilterSidebar />

          {/* Right Opportunities */}
          <section className="flex-1">
            <div className="grid gap-6 md:grid-cols-2">

              <OpportunityCard
  type="Hackathon"
  title="Innovation Hackathon"
  description="Build innovative solutions and showcase your skills."
  mode="Online"
  deadline="30 Oct 2026"
onViewDetails={() => setShowDetails(true)}
/>

<OpportunityCard
  type="Internship"
  title="Software Development Internship"
  description="Gain practical experience by working on real projects."
  mode="Hybrid"
  deadline="05 Nov 2026"
  onViewDetails={() => setShowDetails(true)}
/>

<OpportunityCard
  type="Workshop"
  title="Web Development Workshop"
  description="Learn modern web development technologies and build projects."
  mode="Online"
  deadline="12 Nov 2026"
  onViewDetails={() => setShowDetails(true)}
/>

<OpportunityCard
  type="Competition"
  title="Coding Competition"
  description="Test your problem-solving and programming skills."
  mode="Offline"
  deadline="20 Nov 2026"
  onViewDetails={() => setShowDetails(true)}
/>

            </div>
          </section>

        </div>

      </main>

    </div>
  );
}

export default App;