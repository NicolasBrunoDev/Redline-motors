import React, { useState, useEffect } from 'react';
import AddCarPopup from '../Popups/AddCarPopup';
import Slider from 'react-slick';
import CarDetailPopup from './CarDetailPopup';

function CarSlider({currentUser}) {
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
        autoplaySpeed: 3000,
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

    const [selectedCar, setSelectedCar] = useState(null);

    const deleteCar = async (e, id) => {
        e.stopPropagation(); // ¡CRUCIAL! Evita que se abra el popup de detalles al hacer clic en borrar

        if (window.confirm("¿Estás seguro de que quieres eliminar este vehículo de la flota?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/cars/delete/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert("Vehículo eliminado");
                    fetchCars(); // Recarga la lista de autos automáticamente
                } else {
                    alert("Error al eliminar el vehículo");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            }
        }
    };



    return (
        <div className="py-10 bg-black">
            <CarDetailPopup car={selectedCar} onClose={() => setSelectedCar(null)} />
            <AddCarPopup show={showAddCar} onClose={() => setShowAddCar(false)} onCarAdded={fetchCars} />

        {currentUser?.role === "ADMIN" && (
            <div className="px-10 mb-8 flex justify-between items-center">
                <h2 className="text-white text-3xl font-bold uppercase">
                    Flota de <span className="text-red-700">Alquiler</span>
                </h2>
                <button onClick={() => setShowAddCar(true)} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-bold transition-all">
                    + AÑADIR VEHÍCULO
                </button>
            </div>
            )}

            <div className="px-10">
                {cars.length > 0 ? (
                    <Slider {...settings}>
                        {cars.map((car) => (
                            <div key={car.id} className="px-2">
                                <div
                                    onClick={() => setSelectedCar(car)}
                                    className="relative cursor-pointer bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-red-700 transition-all group"
                                >

                                    {/* BOTON ELIMINAR */}
                                    {currentUser?.role === "ADMIN" && (
                                    <button
                                        onClick={(e) => deleteCar(e, car.id)}
                                        className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        title="Eliminar vehículo"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                    )}

                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-white text-xl font-bold">{car.name}</h3>
                                        <h4 className="text-gray-400 text-sm">{car.brand}</h4>
                                        <p className="text-red-700 font-bold mt-2">{car.priceDay} / día</p>

                                        {/* Opcional: El boton también puede abrir el popup :) */}
                                        <button className="w-full mt-4 bg-white text-black font-bold py-2 rounded-xl hover:bg-red-700 hover:text-white transition-colors">
                                            Ver Detalles
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