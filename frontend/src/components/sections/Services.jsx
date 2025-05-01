import { RoomServiceRounded } from '@mui/icons-material';
import { text } from 'framer-motion/client';
import React from 'react';

const Services = () => {
    const data = [
        {
            head: "Personal Caregivers", 
            icon: '/icons/i1.png',
            text: 'We provide trained male and female caregivers to assist patients who are unable to perform daily tasks due to medical conditions, disabilities, or old age. Our caregivers ensure proper care, companionship, and assistance in daily activities, making daily life more comfortable and stress-free.'
        },
        {
            head: "Nursing Assistance", 
            icon: '/icons/i2.png',
            text: "Trained nurses for patients requiring medical supervision at home. Our nurses provide professional healthcare support, including medication management, vital monitoring, and post-operative care, ensuring patients receive the highest quality medical attention."
        },
        {
            head: "Elderly Companion Care", 
            icon: '/icons/image.png',
            text: "Our companion care service provides emotional support and assistance for elderly individuals. We offer engaging activities, meal preparation, light housekeeping, and companionship to help seniors maintain an active and fulfilling lifestyle."
        },
    ];
    
    return (
        <>
            <section className='py-5 my-5  lg:p-16' >
                <div className='flex justify-center flex-col items-center lg:px-20 mt-10' >
                    <h1 className='font-bold text-4xl text-center'>Our Services</h1>
                    <p className='text-sm  mt-3 text-center' >At Health Care Connect, we offer a range of services to meet diverse healthcare needs, providing professional and compassionate care for our clients.</p>
                </div>
                <div className='flex items-center md:flex-row flex-col gap-5
                 justify-center mt-8' >
                    {data.map((i, idx) => (
                        <>
                            <Card item={i} idx={idx+1}/>
                        </>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Services;

const Card = ({item , idx}) => (
    /* From Uiverse.io by jubayer-10 */
    <div
        class="w-80 rounded-4xl bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden"
    >
        <div class="w-24 h-24 bg-emerald-400 rounded-full absolute -right-5 -top-7">
            <p class="absolute bottom-6 left-7 text-white text-2xl">{idx}</p>
        </div>
        <div class="filg-embg-emerald-400-500 w-12">
            <img className='rounded-full' src={item.icon} alt="" />
        </div>
        <h1 class="font-bold text-xl">{item.head}</h1>
        <p class="text-sm text-zinc-500 leading-6">
            {item.text}
        </p>
    </div>

)
