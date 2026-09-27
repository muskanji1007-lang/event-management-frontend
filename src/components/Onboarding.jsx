import { useState } from "react";

import onboarding1 from "../assets/onboarding-1.jpeg";
import onboarding2 from "../assets/onboarding-2.jpeg";
import onboarding3 from "../assets/onboarding-3.jpeg";

function Onboarding({ onFinish }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: onboarding1,
      title: (
        <>
          Discover Opportunities{" "}
          <span className="text-blue-500">made for you</span>
        </>
      ),
      description:
        "From hackathon to internships, find the right opportunities based on your profile and interests.",
    },
    {
      image: onboarding2,
      title: (
        <>
          Get matched with what fits{" "}
          <span className="text-blue-500">you best</span>
        </>
      ),
      description:
        "Our smart matching system finds opportunities based on your skills, interests and goals.",
    },
    {
      image: onboarding3,
      title: (
        <>
          Save, register and{" "}
          <span className="text-blue-500">stay updated</span>
        </>
      ),
      description:
        "Keep track of your applications, get reminders and never miss an opportunity again",
    },
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#050b1a] px-5 py-6 text-white">
      <div className="mx-auto flex h-full w-full max-w-md flex-col">

        <div className="flex flex-1 items-center justify-center">
          <img
            src={current.image}
            alt="Onboarding illustration"
            className="max-h-[45vh] w-full object-contain"
          />
        </div>

    
        <div className="px-1">
          <h1 className="text-4xl font-semibold leading-[1.15]">
            {current.title}
          </h1>

          <p className="mt-5 max-w-sm text-[17px] font-semibold leading-[1.25] text-gray-400">
            {current.description}
          </p>
        </div>

    
        <div className="mt-14 flex justify-center gap-3">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === currentSlide
                  ? "bg-blue-500"
                  : "bg-white"
              }`}
            />
          ))}
        </div>

        
        <button
          onClick={handleNext}
          className="mb-2 mt-16 flex w-full items-center justify-center gap-4 rounded-full bg-blue-600 py-5 text-2xl font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Next
          <span className="text-3xl font-normal">→</span>
        </button>

      </div>
    </div>
  );
}

export default Onboarding;