import React from 'react'
import {
    FaCarSide,
    FaHeadphonesAlt,
    FaWallet,
    FaCheckCircle,
} from "react-icons/fa";

const ServiceData = [
    {
        id: 1,
        icon: <FaCarSide className='text-4xl md:text-5xl text-red-500'/>,
        title: "Free Delivery",
        description: "Free delivery for all orders over $100",
    },
    {
        id: 2,
        icon: <FaHeadphonesAlt className='text-4xl md:text-5xl text-red-500'/>,
        title: "24/7 Support",
        description: "Get support anytime, anywhere",
    },
    {
        id: 3,
        icon: <FaWallet className='text-4xl md:text-5xl text-red-500'/>,
        title: "Easy Payment",
        description: "Secure payment with no extra fees",
    },
    {
        id: 4,
        icon: <FaCheckCircle className='text-4xl md:text-5xl text-red-500'/>,
        title: "Quality Guarantee",
        description: "We guarantee the quality of all our products",
    },
]

function Services() {
  return (
    <div>
        <div className='container mt-14 md:my-20 pl-5 pr-5'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8'>
                {ServiceData.map((data) => (
                        <div className='flex flex-col items-center sm:flex-row gap-4 text-red-500'>
                            {data.icon}
                            <div>
                            <h1 className='lg:text-xl font-bold'>{data.title}</h1>
                            <h1 className='text-gray-400 text-sm'>{data.description}</h1>
                            </div>
                        </div>))}
                <div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services