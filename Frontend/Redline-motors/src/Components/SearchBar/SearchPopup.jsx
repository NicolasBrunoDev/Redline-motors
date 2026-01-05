import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPopup = ({ isOpen, onClose, filteredCars, searchTerm, setSearchTerm, onCarClick, categories = [] }) => {
  const inputRef = useRef(null);
  // Estado local para el filtro de disponibilidad
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;


const finalDisplayCars = filteredCars.filter(car => {
  // REGLA 1: Si el admin lo marco como NO disponible, no se muestra NUNCA.
  if (car.available === false) return false;

  // REGLA 2: Si el botón "Sin Reserva" esta activado...
  if (onlyAvailable) {
    // Solo mostramos los que NO tienen reservas en su lista
    return !car.bookings || car.bookings.length === 0;
  }

  return true;
});

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] bg-white w-full h-full overflow-y-auto p-10"
      >
        {/* Header con Input */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-10 border-b-2 border-gray-100 pb-5">
          <div className="flex-1 flex flex-col">
            <span className="text-red-700 font-bold text-xs uppercase tracking-widest mb-1">Buscando en Redline Motors</span>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escribe marca o modelo..."
              className="text-4xl font-black text-black uppercase outline-none bg-transparent w-full"
            />
          </div>

          <button onClick={onClose} className="text-black text-6xl font-light hover:text-red-700 transition-colors ml-4">
            &times;
          </button>
        </div>

        {/* Sección de Categorias y Filtro Especial */}
        <div className="max-w-7xl mx-auto mb-10">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">Sugerencias y Estados</p>
          <div className="flex flex-wrap gap-2">

            {/* BOTÓN "SIN RESERVA" */}
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`px-4 py-2 rounded-full border text-xs font-bold uppercase transition-all duration-300 flex items-center gap-2 ${onlyAvailable
                  ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-200"
                  : "bg-transparent border-green-500 text-green-600 hover:bg-green-50"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyAvailable ? "bg-white animate-pulse" : "bg-green-500"}`}></span>
              Sin Reserva
            </button>

            <div className="w-[1px] h-8 bg-gray-200 mx-2 hidden sm:block"></div>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchTerm(cat.name)}
                className={`px-4 py-2 rounded-full border text-xs font-bold uppercase transition-all duration-300 ${searchTerm.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-red-700 border-red-700 text-white"
                    : "bg-transparent border-gray-200 text-gray-500 hover:border-black hover:text-black"
                  }`}
              >
                {cat.name}
              </button>
            ))}

            {(searchTerm || onlyAvailable) && (
              <button
                onClick={() => { setSearchTerm(''); setOnlyAvailable(false); }}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-400 text-xs font-bold uppercase hover:bg-gray-200 transition-colors"
              >
                Limpiar Filtros ×
              </button>
            )}
          </div>
        </div>

        {/* Grid de Resultados */}
        <div className="max-w-7xl mx-auto">
          {finalDisplayCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {finalDisplayCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => {
                    onCarClick(car);
                    onClose();
                  }}
                  className="group cursor-pointer bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 relative"
                >
                  {/* Badge de disponibilidad rápida */}
                  {(!car.bookings || car.bookings.length === 0) && (
                    <div className="absolute top-4 left-4 z-10 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                      Disponible ya
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5 text-black">
                    <span className="text-red-700 text-[10px] font-bold uppercase">{car.brand}</span>
                    <h3 className="text-xl font-black uppercase">{car.name}</h3>
                    <p className="text-gray-600 font-bold">{car.priceDay}/día</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 font-bold italic">
                {onlyAvailable
                  ? "Todos nuestros motores están reservados por ahora..."
                  : `No encontramos nada con "${searchTerm}"...`}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchPopup;