import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 flex flex-col md:flex-row ">
          {/* Image Section */}
          <div className="justify-center items-start gap-6">
            <img
              className="sm:ml-0 ml-auto h-[390px] w-[450px] rounded-xl object-cover"
              src="assets/B076A3E2-DDDF-4D8C-852E-3D4E9E093FD3_1_201_a.jpeg"
              alt="About Us"
            />
          </div>

          {/* Content Section */}
          <div className="w-full flex-col items-start gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Empowering Each Other to Succeed
                </h2>
                <p className="text-gray-500 pl-1 text-base font-normal leading-relaxed lg:text-start text-center">
                  Every project we've undertaken has been a collaborative effort, where every person
                  involved has left their mark. Together, we're not just building a company but a
                  community driven by passion, innovation, and impact.
                </p>
              </div>
              <div className="w-full pl-1 lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">8+</h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Experience</h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">48+</h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful Projects</h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">52+</h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                </div>
              </div>
              {/* Stats Section */}

            </div>

            {/* Read More Button */}

            <Accordion>
              <AccordionSummary>
                <a className="sm:w-fit w-full px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 transition-all duration-700 ease-in-out rounded-lg shadow-md justify-center items-center flex">
                  <span className="px-1.5 text-white text-sm font-medium leading-6">Read More</span>
                </a>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  At the heart of our success lies a deep commitment to excellence, innovation, and collaboration. For years, we have been shaping skylines, creating lasting infrastructures, and fostering meaningful relationships with our clients and partners.
                </p><br />

                <p><strong>What Sets Us Apart?</strong></p>
                <ul>
                  <li className="list-disc pl-2 ml-5"><strong>Expertise & Experience</strong> – With a team of seasoned professionals, we bring industry-leading knowledge and skill to every project.</li>
                  <li className="list-disc pl-2 ml-5"><strong>Innovative Approach</strong> – We embrace the latest technologies and sustainable practices to build for the future.</li>
                  <li className="list-disc pl-2 ml-5"><strong>Client-Centric Vision</strong> – Your vision is our priority. We work closely with you to ensure every project meets your expectations.</li>
                  <li className="list-disc pl-2 ml-5"><strong>Quality & Integrity</strong> – Our commitment to delivering top-tier quality with honesty and transparency remains unwavering.</li>
                </ul>
                <br />
                <p><strong>Our Impact</strong></p>
                <ul>
                  <li className="pl-2 ml-5 list-disc"> <strong>Transforming Landscapes</strong> – From residential to commercial projects, we redefine spaces with precision and creativity.</li>
                  <li className="pl-2 ml-5 list-disc"><strong>Building Relationships</strong> – Trust and collaboration are the foundation of our long-standing partnerships.</li>
                  <li className="pl-2 ml-5 list-disc"><strong>Sustainable Development</strong> – We integrate eco-friendly practices to contribute to a greener tomorrow.</li>
                </ul>

                <p>
                  Whether you're looking for a trusted partner for your next big project or seeking insights into our journey, we invite you to explore more about who we are and what we stand for.
                </p>

              </AccordionDetails>

            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
