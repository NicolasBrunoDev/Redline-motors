import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarDetailPopup = ({ car, onClose, onRentClick, currentUser }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (car && car.images && car.images.length > 0) {
      setSelectedImg(car.images[0]);
    }
  }, [car]);

  const handleRentNow = () => {
    // CAMBIO: Ahora verificamos que acepte términos Y que haya un usuario
    if (acceptedTerms && currentUser && onRentClick) {
      onRentClick(car);
      onClose();
    }
  };

  // CAMBIO: Creamos esta variable para simplificar el código del botón
  const isButtonDisabled = !acceptedTerms || !currentUser;

  if (!car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-6xl overflow-hidden relative shadow-2xl max-h-[95vh] overflow-y-auto z-10"
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-white/50 hover:text-red-600 text-3xl z-20"
          >
            &times;
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[500px]">
            {/* ... COLUMNA 1 y 2 (Sin cambios) ... */}
            <div className="md:col-span-6 bg-black flex items-center justify-center p-4">
              <img src={selectedImg} alt={car.name} className="w-full h-full object-contain max-h-[500px]" />
            </div>

            <div className="md:col-span-1 bg-gray-800/50 p-4 flex md:flex-col gap-4 overflow-x-auto">
              {car.images?.map((img, idx) => (
                <img key={idx} src={img} onClick={() => setSelectedImg(img)} 
                     className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${selectedImg === img ? 'border-red-600' : 'border-white/10'}`} />
              ))}
            </div>

            {/* COLUMNA 3: Info y Acción */}
            <div className="md:col-span-5 p-8 flex flex-col h-full bg-gray-900 border-l border-white/5 justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-red-700 font-bold uppercase tracking-widest text-[12px]">{car.brand}</span>
                  <span className="bg-red-700/10 text-red-600 text-[9px] mr-5 px-5 py-0.5 rounded-full border border-red-700/20 uppercase font-bold">
                    {car.category}
                  </span>
                </div>
                <h2 className="text-white text-3xl font-black uppercase tracking-tighter leading-none">{car.name}</h2>
                <div className="h-1 w-16 bg-red-700 my-4"></div>
                
                {/* Características (Igual que antes) */}
                {car.features?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-3">Especificaciones</p>
                    <div className="grid grid-cols-3 gap-2">
                      {car.features.map((feat, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-center min-h-[50px]">
                          <p className="text-[7px] text-gray-500 uppercase font-bold leading-none mb-1">{feat.name}</p>
                          <p className="text-white text-[10px] font-black italic uppercase">{feat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: Precio, Checkbox y Botón */}
              <div className="mt-4">
                <div className="border-t border-white/5 pt-4 mb-6">
                  <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">Precio por día</p>
                  <p className="text-white text-2xl font-bold">{car.priceDay} <span className="text-xs font-normal text-gray-500">/ jornada</span></p>
                </div>

                {/* Checkbox: Añadimos una opacidad si no hay usuario para guiar la vista */}
                <div 
                  className={`flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-xl border border-white/5 transition-all
                    ${!currentUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/10'}`}
                  onClick={() => currentUser && setAcceptedTerms(!acceptedTerms)}
                >
                  <input 
                    type="checkbox" 
                    checked={acceptedTerms}
                    disabled={!currentUser}
                    readOnly
                    className="w-4 h-4 accent-red-700"
                  />
                  <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest select-none">
                    Acepto los <span className="text-red-700 underline">términos y condiciones</span>
                  </label>
                </div>
                
                {/* BOTÓN ACTUALIZADO */}
                <button 
                  onClick={handleRentNow}
                  disabled={isButtonDisabled}
                  className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg uppercase text-xs tracking-widest
                    ${!isButtonDisabled 
                      ? 'bg-red-700 hover:bg-red-800 text-white shadow-red-900/20 active:scale-95' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                  {!currentUser ? 'Inicia sesión para alquilar' : 'Alquilar ahora'}
                </button>

                {!currentUser && (
                  <p className="text-center text-red-700/70 text-[8px] uppercase font-bold tracking-tighter mt-2">
                    * Debes estar autenticado para reservar vehículos
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CarDetailPopup;