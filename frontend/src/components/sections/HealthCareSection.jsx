import React from "react";

const HealthCareSection = ({connectOpen, setConnectOpen}) => {
  return (
    <section className="py-16 relative z-30">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-between gap-8 flex lg:flex-row flex-col">
          <div className="w-full flex-col justify-start lg:items-start  gap-10 inline-flex">
            <div className="w-full flex-col justify-start lg:items-start items-start gap-4 flex">
              <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                Your Trusted Partners in Healthcare Solutions
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
  We specialize in patient care, providing trained nurses and caretakers for day/night shifts or 24-hour care. Our goal is to ensure quality and compassionate healthcare services at your convenience.
</p>
<p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
  Our dedicated team offers personalized care plans tailored to meet individual needs, ensuring comfort and well-being for patients of all ages.
</p>
<p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
  With a focus on professionalism and empathy, we strive to create a supportive environment where patients receive the best possible care in the comfort of their homes.
</p>

            </div>
            <button onClick={()=>{setConnectOpen(true)}} className="sm:w-fit w-full px-3.5 py-2 bg-emerald-400 hover:bg-[#01adf0] transition-all duration-700 ease-in-out rounded-lg shadow-md justify-center items-center flex">
              <span className="px-1.5 text-white text-sm font-medium leading-6">
                Contact Us
              </span>
            </button>
          </div>
          <img
            className="lg:mx-0 mx-auto h-96  rounded-3xl object-cover"
            src="/assets/WhatsApp Image 2025-02-17 at 16.07.03.jpeg"
            alt="Healthcare Connect"
          />
        </div>
      </div>
    </section>
  );
};

export default HealthCareSection;
