import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarDetailPopup = ({ car, onClose }) => {
  if (!car) return null;

  // Simulamos una galería usando la imagen principal (en un caso real serían car.images[])
  const gallery = [car.image, car.image, car.image]; 

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-6xl overflow-hidden relative shadow-2xl"
        >
          {/* Botón Cerrar */}
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-red-600 text-3xl z-10">&times;</button>

          <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[500px]">
            
            {/* COLUMNA 1: Imagen Grande (6/12) */}
            <div className="md:col-span-7 bg-black flex items-center justify-center p-4">
              <img src={car.image} alt={car.name} className="w-full h-full object-contain max-h-[500px]" />
            </div>

            {/* COLUMNA 2: Galería Miniaturas (1/12) */}
            <div className="md:col-span-1 bg-gray-800/50 p-4 flex md:flex-col gap-4 overflow-y-auto items-center">
              {gallery.map((img, idx) => (
                <img key={idx} src={img} className="w-16 h-16 object-cover rounded-lg cursor-pointer border border-white/10 hover:border-red-600 transition-all" />
              ))}
            </div>

            {/* COLUMNA 3: Info y Acción (4/12) */}
            <div className="md:col-span-4 p-10 flex flex-col justify-between">
              <div>
                <span className="text-red-700 font-bold uppercase tracking-widest text-sm">{car.brand}</span>
                <h2 className="text-white text-4xl font-black mt-2 uppercase">{car.name}</h2>
                <div className="h-1 w-20 bg-red-700 my-6"></div>
                
                <p className="text-gray-400 leading-relaxed text-lg">
                  Experimenta la potencia del {car.name}. Este vehículo ha sido revisado por nuestros expertos en <span className="text-white">Redline</span> para garantizar el máximo rendimiento en pista y carretera.
                </p>

                <div className="mt-8">
                    <p className="text-gray-500 text-sm uppercase font-bold">Precio Especial</p>
                    <p className="text-white text-3xl font-bold">{car.priceDay} <span className="text-sm font-normal text-gray-400">/ jornada completa</span></p>
                </div>
              </div>

              <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-red-900/20 uppercase tracking-widest mt-10">
                Alquilar este vehículo
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CarDetailPopup;