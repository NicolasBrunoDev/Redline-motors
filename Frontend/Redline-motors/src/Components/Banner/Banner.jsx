import React from 'react'

import Car from '../../assets/images/Car2.png';

const BannerData = {
    discount: "20% OFF",
    image: Car,
    title: "Summer Sale",
    date: "Valid until February 21, 2026",
    title2: "BMW M4 Coupé",
    title3: "Explore More",
    title4: "Limited Time Offer",
    bgColor: "#FF5733",
}


function Banner({data}) {
  return (
    <div className='min-h-[550px] flex justify-center items-center py-12'>
        <div style={{ backgroundColor: BannerData.bgColor }} className='container rounded-3xl'>
            <div style={{ backgroundColor: BannerData.bgColor }} className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl'>
                {/* first col */}
                <div className='p-6 sm:p-8'>
                    <p data-aos="slide-right" className='text-sm'>{BannerData.discount}</p>
                    <h1 data-aos="zoom-out" className='uppercase text-4xl lg:text-7xl font-bold'>{""}{BannerData.title}</h1>
                    <p data-aos="fade-up" className='text-sm'>{BannerData.date}</p>
                </div>
                 {/* second col */}
                 <div data-aos="zoom-in" className='h-full flex items-center'>
                    <img src={BannerData.image} alt="Car" className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover" />
                 </div>
                  {/* third col */}
                  <div className='flex flex-col justify-center gap-4 p-6 sm:p-8'>
                    <p data-aos="zoom-out" className='font-bold text-xl'>{BannerData.title2}</p>
                    <p data-aos="fade-up" className='text-3xl sm:text-5xl font-bold'>{BannerData.title3}</p>
                    <p data-aos="fade-up" className='text-sm tracking-wide leading-5'>{BannerData.title4}</p>
                    <div data-aos="fade-up" data-aos-offset="0">
                        <button style={{color:BannerData.bgColor}} className='bg-white py-2 px-4 rounded-full cursor-pointer hover:scale-110 duration-300'>
                            Shop Now
                        </button>
                    </div>
                  </div>
            </div>
        </div>
    </div>
  )
}

export default Banner