import React, { useState, useEffect } from 'react';
import AddCarPopup from '../Popups/AddCarPopup';
import Slider from 'react-slick';

function CarSlider() {
    const [cars, setCars] = useState([]);
    const [showAddCar, setShowAddCar] = useState(false); 

    const fetchCars = () => {
        fetch("http://localhost:8080/api/cars/all")
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.error("Error cargando autos", err));
    };


    useEffect(() => {
        fetchCars();
    }, []);

    const settings = {
    dots: true,
    arrows: false,
    infinite: cars.length > 3,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "ease-in-out",
    responsive: [ 
        {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 640,
            settings: { slidesToShow: 1 }
        }
    ]
};

return (
    <div className="py-10 bg-black">
        <AddCarPopup show={showAddCar} onClose={() => setShowAddCar(false)} onCarAdded={fetchCars} />

        <div className="px-10 mb-8 flex justify-between items-center">
            <h2 className="text-white text-3xl font-bold uppercase">
                Flota de <span className="text-red-700">Alquiler</span>
            </h2>
            <button onClick={() => setShowAddCar(true)} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-bold transition-all">
                + AÑADIR VEHÍCULO
            </button>
        </div>

        <div className="px-10"> 
            {cars.length > 0 ? (
                <Slider {...settings}>
                    {cars.map((car) => (
                        <div key={car.id} className="px-2"> 
                            <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-red-700 transition-all group">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="p-6">
                                    <h3 className="text-white text-xl font-bold">{car.name}</h3>
                                    <h4 className="text-gray-400 text-sm">{car.brand}</h4>
                                    <p className="text-red-700 font-bold mt-2">{car.priceDay} / día</p>
                                    <button className="w-full mt-4 bg-white text-black font-bold py-2 rounded-xl hover:bg-red-700 hover:text-white transition-colors">
                                        Alquilar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-gray-500 italic px-10">Cargando flota de Redline...</p>
            )}
        </div>
    </div>
);
}
export default CarSlider;