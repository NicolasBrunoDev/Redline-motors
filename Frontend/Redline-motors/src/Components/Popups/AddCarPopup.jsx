import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AddCarPopup = ({ show, onClose, onCarAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    priceDay: '',
    image: '',
    available: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UN SOLO handleSubmit con toda la lógica necesaria
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/cars/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("¡Vehículo añadido a la flota!");
        onCarAdded(); // Refresca el slider en CarSlider.jsx
        onClose();    // Cierra este popup
        setFormData({ name: '', brand: '', priceDay: '', image: '', available: true }); // Limpiar campos
      } else {
        console.error("Error en la respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error de red al añadir auto:", error);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-gray-900 border border-red-700 p-8 rounded-3xl w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center uppercase">
              NUEVO <span className="text-red-700">REDLINE</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
              <input 
                name="name" 
                placeholder="Nombre (ej: GTR R35)" 
                value={formData.name}
                className="bg-gray-800 p-3 rounded-xl outline-none border border-gray-700 focus:border-red-700" 
                onChange={handleChange} 
                required 
              />
              <input 
                name="brand" 
                placeholder="Marca (ej: Nissan)" 
                value={formData.brand}
                className="bg-gray-800 p-3 rounded-xl outline-none border border-gray-700 focus:border-red-700" 
                onChange={handleChange} 
                required 
              />
              <input 
                name="priceDay" 
                placeholder="Precio por día (ej: 300€)" 
                value={formData.priceDay}
                className="bg-gray-800 p-3 rounded-xl outline-none border border-gray-700 focus:border-red-700" 
                onChange={handleChange} 
                required 
              />
              <input 
                name="image" 
                placeholder="URL de la imagen" 
                value={formData.image}
                className="bg-gray-800 p-3 rounded-xl outline-none border border-gray-700 focus:border-red-700" 
                onChange={handleChange} 
                required 
              />
              
              <div className="flex gap-4 mt-4">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 bg-gray-700 py-3 rounded-xl font-bold hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-red-700 py-3 rounded-xl font-bold hover:bg-red-800 transition duration-300 ease-in-out"
                >
                  CONFIRMAR
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddCarPopup;