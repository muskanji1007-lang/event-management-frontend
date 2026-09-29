import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import CategoryCard from "../../components/CategoryCard";
import EventCard from "../../components/EventCard";
import UpcomingEvents from "../../components/UpcomingEvents";
import ProgressCard from "../../components/ProgressCard";

import { events } from "../../data/events";

function Home() {
  return (
    <div className="min-h-screen bg-[#f6fafc] flex">

    
      <Sidebar />


      <main className="flex-1 min-w-0">

    
        <Topbar />

        <div className="p-4">

          <div className="grid grid-cols-[minmax(0,1fr)_165px] gap-3">


            <section>

              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-[95px] rounded-xl overflow-hidden mb-3"
              >

        
                <img
                  src="src/assets/home page.jpeg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25" />

                <div className="relative z-10 p-3 text-white">

                  <p className="text-[8px]">
                    Good Morning
                  </p>

                  <h1 className="text-[15px] font-bold">
                    Muskan <span>Gupta</span>
                  </h1>

                  <p className="text-[8px] leading-tight">
                    Explore opportunities, build your skills
                    <br />
                    and create your future.
                  </p>

                  <div className="flex gap-2 mt-2">

                    <button className="bg-[#0878e5] rounded px-3 py-1 text-[7px]">
                      Explore Events →
                    </button>

                    <button className="border border-white/70 rounded px-3 py-1 text-[7px]">
                      View My Registrations
                    </button>

                  </div>

                </div>

              </motion.div>

        
              <h2 className="text-[12px] font-bold mb-2">
                Popular Categories
              </h2>

              <div className="grid grid-cols-3 gap-3 mb-3">

                <CategoryCard
                  type="hackathon"
                  title="Hackathons"
                  description="Build & Compete"
                />

                <CategoryCard
                  type="internship"
                  title="Internships"
                  description="Start your career"
                />

                <CategoryCard
                  type="competition"
                  title="Competitions"
                  description="Show your talent"
                />

              </div>

        
              <h2 className="text-[12px] font-bold mb-2">
                Featured Events
              </h2>

              <div className="grid grid-cols-3 gap-3">

                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}

              </div>

            </section>

    
            <aside className="space-y-3">

              <UpcomingEvents />

              <ProgressCard />

            </aside>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;