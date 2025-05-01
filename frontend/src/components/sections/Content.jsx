import React from 'react';

const Content = () => {
    return (
        <section className='lg:px-7 mb-5 lg:mx-32 mx-4 py-10 md:shadow-md rounded-4xl md:ring-black md:ring-[.2px] hover:bg-emerald-500 transition-all duration-300 hover:text-white'>
            <div className='flex flex-col gap-4 justify-center items-center text-center'>
                <h1 className='font-bold text-3xl'>About Us</h1>
                <p className='text-md  max-w-2xl'>
                    At Health Care Connect, we are dedicated to providing compassionate and professional healthcare services. Our team of trained nurses and caregivers ensures that patients receive the best possible support tailored to their individual needs.
                </p>
            </div>
            
            <div className='flex flex-col lg:flex-row gap-8 mt-6 '>
                <img className='w-full lg:w-[450px] h-72 rounded-4xl' src="/assets/imageee.webp" alt="Healthcare" />
                <div className=' mt-8 max-w-2xl'>
                    <p>
                        Health Care Connect (HCC) is committed to bridging the gap between patients and professional caregivers. We specialize in providing skilled nursing care and home support services for individuals who need assistance due to aging, medical conditions, or post-operative recovery.
                    </p>
                    <p className='mt-4'>
                        Our services include in-home care, post-surgical recovery assistance, and elderly support to ensure a comfortable and dignified experience. We prioritize trust, respect, and personalized care, making a positive impact on the well-being of our patients and their families.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Content;
