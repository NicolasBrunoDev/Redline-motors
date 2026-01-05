import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReservationPopup = ({ show, car, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Bloqueo de seguridad: Si por alguna razón el popup se abre con un auto no disponible (Los caminos del codigo son misteriosos)
  if (show && car && !car.available) {
    return (
      <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 border border-red-700/30 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl"
        >
          <div className="text-red-700 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-black text-white uppercase mb-4">Vehículo No Disponible</h2>
          <p className="text-gray-400 text-sm mb-6">
            Lo sentimos, el <span className="text-white font-bold">{car.name}</span> ha sido retirado de la flota temporalmente por mantenimiento.
          </p>
          <button onClick={onClose} className="w-full bg-red-700 py-3 rounded-xl font-bold text-white uppercase text-xs">
            Volver al catálogo
          </button>
        </motion.div>
      </div>
    );
  }

  const handleConfirm = () => {
    // 2. Validación final antes de procesar
    if (!car?.available) {
      alert("Error: Este vehículo no está disponible para reserva.");
      onClose();
      return;
    }

    if (!selectedDate) {
      alert("Por favor, selecciona una fecha.");
      return;
    }
    setIsSuccess(true);
  };

  const closeAndReset = () => {
    setIsSuccess(false);
    setSelectedDate("");
    onClose();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gray-900 border border-red-700/30 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl"
        >
          {!isSuccess ? (
            <>
              <h2 className="text-2xl font-black text-white uppercase mb-2">Reservar <span className="text-red-700">{car?.name}</span></h2>
              <p className="text-gray-400 text-sm mb-6">Selecciona el día de inicio para tu jornada Redline.</p>
              
              <input 
                type="date" 
                min={new Date().toISOString().split("T")[0]} 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white outline-none focus:border-red-700 mb-6 transition-all"
              />

              <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 text-gray-500 font-bold uppercase text-xs">Cancelar</button>
                <button 
                  onClick={handleConfirm}
                  className="flex-1 bg-red-700 py-3 rounded-xl font-bold hover:bg-red-800 transition-all uppercase text-xs tracking-widest text-white shadow-[0_0_20px_rgba(185,28,28,0.4)]"
                >
                  Confirmar
                </button>
              </div>
            </>
          ) : (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase mb-4">¡Reserva Exitosa!</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Tu reserva para el día <span className="text-white font-bold">{selectedDate}</span> fue creada exitosamente.
              </p>
              <button 
                onClick={closeAndReset}
                className="w-full bg-white text-black font-black py-4 rounded-xl uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
              >
                Entendido
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReservationPopup;