import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FavoritesPopup = ({ isOpen, onClose, favoriteCars, onCarClick, onRemoveFavorite }) => {
  
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-[2000] bg-white w-full h-full overflow-y-auto p-10"
      >
        {/* Header Visualmente idéntico al Search */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-10 border-b-2 border-gray-100 pb-5">
          <div className="flex-1 flex flex-col">
            <span className="text-red-700 font-bold text-xs uppercase tracking-widest mb-1">Tu Selección Personal</span>
            <h2 className="text-4xl font-black text-black uppercase">Mis Favoritos</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="text-black text-6xl font-light hover:text-red-700 transition-colors ml-4"
          >
            &times;
          </button>
        </div>

        {/* Grid de Favoritos */}
        <div className="max-w-7xl mx-auto">
          {favoriteCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteCars.map((car) => (
                <div 
                  key={car.id}
                  className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Botón para eliminar de favoritos (La X en la esquina de la foto) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(e, car.id);
                    }}
                    className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-red-700 hover:text-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all"
                    title="Eliminar de favoritos"
                  >
                    &times;
                  </button>

                  <div className="overflow-hidden cursor-pointer" onClick={() => onCarClick(car)}>
                    <img 
                      src={car.images[0]} 
                      alt={car.name} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-5 text-black cursor-pointer" onClick={() => onCarClick(car)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-red-700 text-[10px] font-bold uppercase">{car.brand}</span>
                        <h3 className="text-xl font-black uppercase">{car.name}</h3>
                      </div>
                      <p className="text-black font-black text-lg">{car.priceDay}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 font-bold italic uppercase tracking-tighter">
                Tu garaje está vacío... <br/>
                <span className="text-sm font-normal not-italic tracking-normal">Marca algunos motores con el ❤️ para verlos aquí.</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FavoritesPopup;