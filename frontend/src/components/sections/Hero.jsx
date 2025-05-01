import React from 'react';
// import backgroundImg from '../assets/IMG-20240824-WA0000.jpg';

export default function Hero() {
  return (
    <div id='home'>
      <section className="relative bg-blueGray-50">
        <div className="relative pt-16 pb-12 flex content-center items-center justify-center min-h-screen-75">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
            backgroundImage: `url(${"/assets/total-shape-yn8KzjHGtak-unsplash.jpg"})`
          }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-70 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-3 ml-auto mr-auto text-center">
                <div className="">
                  <h1 className="text-white font-semibold text-5xl">
                    Welcome to Health Care Connect
                  </h1>
                  <p className="mt-4 text-lg" style={{ color: "#f1f1f1" }}>
                    Bridging the gap between healthcare providers & patients for better access, awareness, and care.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>
        <section className="pb-10 bg-blueGray-200 -mt-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-stethoscope"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Our Vision</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      To create a world where quality healthcare is accessible to everyone, ensuring well-being and longevity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="bg-emerald-400 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-heartbeat"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Our Mission</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      To connect patients with trusted healthcare professionals, provide essential medical resources, and promote health awareness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-hand-holding-medical"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Our Approach</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      We focus on leveraging technology and community engagement to provide better healthcare accessibility and support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
