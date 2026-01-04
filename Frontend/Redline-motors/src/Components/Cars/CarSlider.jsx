import React, { useState, useEffect } from 'react';
import AddCarPopup from '../Popups/AddCarPopup';
import Slider from 'react-slick';
import CarDetailPopup from './CarDetailPopup';

function CarSlider({ currentUser, categoryFilter, onRentClick }) {
    const [cars, setCars] = useState([]);
    const [showAddCar, setShowAddCar] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [carToEdit, setCarToEdit] = useState(null);

    const fetchCars = () => {
        fetch("http://localhost:8080/api/cars/all")
            .then(res => res.json())
            .then(data => {
                if (categoryFilter) {
                    const filtered = data.filter(car => car.category === categoryFilter);
                    setCars(filtered);
                } else {
                    setCars(data);
                }
            })
            .catch(err => console.error("Error cargando autos", err));
    };

    useEffect(() => {
        fetchCars();
    }, [categoryFilter]);

    const handleEditClick = (e, car) => {
        e.stopPropagation();
        setCarToEdit(car);
        setShowAddCar(true);
    };

    const handleClosePopup = () => {
        setShowAddCar(false);
        setCarToEdit(null);
    };

    const deleteCar = async (e, id) => {
        e.stopPropagation();
        if (window.confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/cars/delete/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchCars();
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            }
        }
    };

    const settings = {
        dots: true,
        arrows: false,
        infinite: cars.length > 1,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ],
        cssEase: "linear",
    };

    if (cars.length === 0 && categoryFilter) return null;

    return (
        <div className="py-10 bg-black">

            {selectedCar && (
                <CarDetailPopup 
                    car={selectedCar} 
                    onClose={() => setSelectedCar(null)} 
                    onRentClick={onRentClick} 
                    currentUser={currentUser}
                />
            )}

            <AddCarPopup
                show={showAddCar}
                onClose={handleClosePopup}
                onCarAdded={fetchCars}
                editData={carToEdit}
            />

            <div className="px-10 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-white text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
                        <span>Flota de <span className="text-red-700">Alquiler</span></span>
                        {categoryFilter && (
                            <>
                                <span className="text-gray-700 font-light text-4xl">|</span>
                                <span className="text-red-700 italic">{categoryFilter}</span>
                            </>
                        )}
                    </h2>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">
                        {categoryFilter ? `Explorando el segmento ${categoryFilter}` : "High Performance Selection"}
                    </p>
                </div>

                {currentUser?.role === "ADMIN" && (
                    <button
                        onClick={() => setShowAddCar(true)}
                        className="bg-red-700 hover:bg-red-800 text-white px-6 py-2.5 rounded-xl font-black transition-all shadow-lg shadow-red-900/20 uppercase text-xs tracking-widest"
                    >
                        + AÑADIR VEHÍCULO
                    </button>
                )}
            </div>

            <div className="px-10">
                {cars.length > 0 ? (
                    <Slider {...settings}>
                        {cars.map((car) => (
                            <div key={car.id} className="px-2">
                                <div
                                    onClick={() => setSelectedCar(car)}
                                    className="relative cursor-pointer bg-gray-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-700/50 transition-all group"
                                >
                                    {currentUser?.role === "ADMIN" && (
                                        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={(e) => handleEditClick(e, car)}
                                                className="bg-black/60 hover:bg-blue-600 text-white p-2.5 rounded-full backdrop-blur-sm transition-all"
                                                title="Editar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={(e) => deleteCar(e, car.id)}
                                                className="bg-black/60 hover:bg-red-700 text-white p-2.5 rounded-full backdrop-blur-sm transition-all"
                                                title="Eliminar"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <img
                                        src={car.images && car.images[0]}
                                        alt={car.name}
                                        className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-red-700 text-[10px] font-black uppercase tracking-widest">{car.category}</span>
                                                <h3 className="text-white text-xl font-bold leading-none mt-1">{car.name}</h3>
                                            </div>
                                            <p className="text-white font-black text-lg">${car.priceDay}</p>
                                        </div>
                                        <h4 className="text-gray-500 text-sm mb-4">{car.brand}</h4>

                                        <button className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-red-700 hover:text-white transition-all uppercase text-xs tracking-widest">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-gray-600 animate-pulse uppercase tracking-[0.3em] text-sm font-bold">Inyectando combustible al servidor...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarSlider;