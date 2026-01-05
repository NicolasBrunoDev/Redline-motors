import React, { useState, useEffect } from 'react';
import AddCarPopup from '../Popups/AddCarPopup';
import Slider from 'react-slick';
import CarDetailPopup from './CarDetailPopup';

function CarSlider({ currentUser, categoryFilter, onRentClick, view, userFavorites, onToggleFavorite }) {
    const [cars, setCars] = useState([]);
    const [showAddCar, setShowAddCar] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [carToEdit, setCarToEdit] = useState(null);

    const fetchCars = () => {
        fetch("http://localhost:8080/api/cars/all")
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.available - a.available);
                setCars(sortedData);
            })
            .catch(err => console.error("Error cargando autos", err));
    };

    useEffect(() => {
        fetchCars();
    }, []);

    // 3. LÓGICA DE FILTRADO (Ahora usa userFavorites que viene por props)
    const displayCars = cars.filter(car => {
        if (view === "favoritos") {
            // Verificamos que userFavorites exista antes de filtrar
            return userFavorites && userFavorites.includes(car.id);
        }
        if (categoryFilter) {
            return car.category === categoryFilter;
        }
        return true;
    });

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

    // 4. ELIMINADO: handleToggleFavorite local. 
    // Usaremos directamente la prop 'onToggleFavorite' en el onClick del botón.

    const settings = {
        dots: true,
        arrows: false,
        infinite: displayCars.length > 1,
        speed: 800,
        slidesToShow: Math.min(3, displayCars.length),
        slidesToScroll: 1,
        autoplay: displayCars.length > 1,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: Math.min(2, displayCars.length) } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ],
        cssEase: "linear",
    };

    if (displayCars.length === 0 && categoryFilter && view !== "favoritos") return null;



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

            {/* --- CABECERA DINÁMICA --- */}
            <div className="px-10 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-white text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
                        <span>
                            {view === "favoritos" ? "Mis" : "Flota de"}{" "}
                            <span className="text-red-700">{view === "favoritos" ? "Favoritos" : "Alquiler"}</span>
                        </span>
                        {categoryFilter && view !== "favoritos" && (
                            <>
                                <span className="text-gray-700 font-light text-4xl">|</span>
                                <span className="text-red-700 italic">{categoryFilter}</span>
                            </>
                        )}
                    </h2>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">
                        {view === "favoritos"
                            ? "Tu garaje personal de alto rendimiento"
                            : categoryFilter
                                ? `Explorando el segmento ${categoryFilter}`
                                : "High Performance Selection"}
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

            {/* --- CONTENIDO DINÁMICO (SLIDER O VACÍO) --- */}
            <div className="px-10">
                {displayCars.length > 0 ? (
                    <Slider {...settings}>
                        {displayCars.map((car) => (
                            <div key={car.id} className="px-2">
                                <div
                                    onClick={() => setSelectedCar(car)}
                                    className={`relative cursor-pointer bg-gray-900 rounded-3xl overflow-hidden border transition-all group ${car.available ? 'border-white/5 hover:border-red-700/50' : 'border-red-900/20'
                                        }`}
                                >
                                    {/* Botón Favorito (con tu animación burst) */}
                                    <button
                                        // CAMBIO AQUÍ: Usamos onToggleFavorite que viene por props
                                        onClick={(e) => onToggleFavorite(e, car.id)}
                                        className="absolute top-4 left-4 z-40 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 transition-all group/fav"
                                    >
                                        {/* CAMBIO AQUÍ: userFavorites?.includes para seguridad */}
                                        {userFavorites?.includes(car.id) && (
                                            <span className="absolute inset-0 rounded-full bg-red-600/40 animate-ping opacity-0"
                                                style={{ animationIterationCount: 1, animationDuration: '0.6s' }}>
                                            </span>
                                        )}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transition-all duration-300 ${userFavorites?.includes(car.id) // CAMBIO AQUÍ: sincronizado con App.jsx
                                                    ? 'fill-red-600 stroke-red-600 scale-110 animate-burst'
                                                    : 'fill-none stroke-white group-hover/fav:stroke-red-500'
                                                }`}
                                            viewBox="0 0 24 24"
                                            strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </button>

                                    {/* ... Resto de la tarjeta (imagen, mantenimiento, admin buttons) ... */}
                                    {!car.available && (
                                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                            <div className="bg-red-700 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-[0.2em] uppercase shadow-xl border border-white/10 -rotate-2">
                                                Fuera de Servicio
                                            </div>
                                        </div>
                                    )}

                                    {currentUser?.role === "ADMIN" && (
                                        <div className="absolute top-4 right-4 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={(e) => handleEditClick(e, car)} className="bg-black/60 hover:bg-blue-600 text-white p-2.5 rounded-full backdrop-blur-sm transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button onClick={(e) => deleteCar(e, car.id)} className="bg-black/60 hover:bg-red-700 text-white p-2.5 rounded-full backdrop-blur-sm transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <img src={car.images && car.images[0]} alt={car.name} className={`w-full h-52 object-cover transition-transform duration-700 ${car.available ? 'group-hover:scale-110' : 'grayscale brightness-50 contrast-75'}`} />

                                    <div className={`p-6 transition-opacity ${!car.available ? 'opacity-30' : ''}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-red-700 text-[10px] font-black uppercase tracking-widest">{car.category}</span>
                                                <h3 className="text-white text-xl font-bold leading-none mt-1">{car.name}</h3>
                                            </div>
                                            <p className="text-white font-black text-lg">{car.priceDay}</p>
                                        </div>
                                        <h4 className="text-gray-500 text-sm mb-4">{car.brand}</h4>
                                        <button disabled={!car.available} className={`w-full font-black py-3 rounded-xl transition-all uppercase text-xs tracking-widest ${car.available ? 'bg-white text-black hover:bg-red-700 hover:text-white' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}>
                                            {car.available ? "Ver Detalles" : "No Disponible"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="py-20 text-center border border-dashed border-gray-800 rounded-3xl">
                        <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
                            {view === "favoritos" ? "Aún no tienes vehículos favoritos" : "No hay vehículos disponibles"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarSlider;