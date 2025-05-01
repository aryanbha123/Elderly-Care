import React from 'react';

const Info = () => {
    return (
        <div className='px-9'>
            {/* Section 1 */}
            <div className='flex flex-col lg:flex-row lg:gap-11 items-center'>
                <img 
                    className='h-96 w-96 rounded-2xl object-cover' 
                    src="/assets/WhatsApp Image 2025-02-17 at 16.07.03 (1).jpeg" 
                    alt="Healthcare and Well-being" 
                />

                <div className='mt-6 lg:mt-0 lg:w-1/2'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        Why Healthcare Matters
                    </h1>
                    <p className='text-gray-600 text-lg'>
                        Healthcare is essential for maintaining a high quality of life. It ensures access to 
                        medical services, preventive care, and promotes overall well-being. A well-structured 
                        healthcare system not only treats illnesses but also fosters preventive measures, 
                        mental health support, and community awareness.
                    </p>
                    <p className='text-gray-600 text-lg mt-3'>
                        Regular medical check-ups, a balanced lifestyle, and access to quality medical 
                        facilities contribute to healthier and longer lives. Strengthening healthcare 
                        infrastructure and spreading awareness can drastically reduce health risks and 
                        improve community well-being.
                    </p>
                </div>
            </div>

            {/* Section 2 */}
            <div className='flex flex-col lg:flex-row-reverse lg:gap-11 items-center mt-16'>
                <img 
                    className='h-96 w-96 rounded-2xl object-cover' 
                    src="/assets/WhatsApp Image 2025-02-17 at 16.07.03 (3).jpeg" 
                    alt="Preventive Healthcare" 
                />

                <div className='mt-6 lg:mt-0 lg:w-1/2'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        The Power of Preventive Care
                    </h1>
                    <p className='text-gray-600 text-lg'>
                        Prevention is the foundation of good health. By adopting healthier lifestyles, 
                        maintaining regular medical visits, and staying informed about potential health risks, 
                        individuals can significantly reduce the chances of severe illnesses.
                    </p>
                    <p className='text-gray-600 text-lg mt-3'>
                        Investing in healthcare awareness and ensuring timely medical intervention can 
                        lead to improved public health outcomes. By prioritizing prevention, we can 
                        create a healthier society with reduced medical costs and enhanced well-being.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Info;
