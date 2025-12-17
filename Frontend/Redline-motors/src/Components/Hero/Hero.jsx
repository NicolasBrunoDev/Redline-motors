import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moto1 from '../../assets/images/Moto1.png';
import Moto2 from '../../assets/images/Moto2.png';
import MotoHelm1 from '../../assets/images/Motorcycle_helm1.png';
import Button from '../shared/Button';
import Car1 from '../../assets/images/Car1.png';


const HeroData = [
    {
        id: 1,
        image: Moto1,
        title: 'Experience the Thrill of Driving',
        subtitle: 'Discover Your Perfect Ride Today',
        title2: "Motorbikes",
    },
    {
        id: 2,
        image: Moto2,
        title: 'Experience the Thrill of Driving',
        subtitle: 'Discover Your Perfect Ride Today',
        title2: "Garaje",
    },
    {
        id: 3,
        image: MotoHelm1,
        title: 'Experience the Thrill of Driving',
        subtitle: 'Discover Your Perfect Ride Today',
        title2: "Accesories",
    },
    {
        id: 4,
        image: Car1,
        title: 'Experience the Thrill of Driving',
        subtitle: 'Discover Your Perfect Ride Today',
        title2: "Accesories",
    },
]

function Hero() {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    return (
        <div className="container mx-auto">
            <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color">

                <div className="pb-8 sm:pb-0">
                    <Slider {...settings}>
                        {HeroData.map((data) => (
                            <div key={data.id}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center h-full">

                                    {/* Text */}
                                    <div className='flex flex-col justify-center h-full gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                        <h1 className='text-2xl sm:text-6xl lg:text-2xl font-bold'>{data.subtitle}</h1>
                                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                                        <h1 className='text-5xl uppercase text-white dark:text-white/5 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold'>
                                            {data.title2}
                                        </h1>
                                        <div>
                                            <Button
                                                text="Shop Now"
                                                bgColor="bg-red-600 hover:bg-red-700"
                                                textColor="text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className='order-1 sm:order-2 flex items-center justify-center h-full'>
                                        <img
                                            src={data.image}
                                            alt=""
                                            className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,0.4)] relative z-40"
                                        />
                                    </div>

                                </div>

                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </div>
    );

}

export default Hero