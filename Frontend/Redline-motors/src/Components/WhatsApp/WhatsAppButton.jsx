import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; 

const WhatsAppButton = () => {
  const phoneNumber = "1234567890"; 
  const message = "Hola Redline, tengo una consulta sobre uno de sus vehículos.";
  
  const handleWhatsAppClick = () => {
  
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    try {
      window.open(url, '_blank');
      alert("Abriendo WhatsApp... ¡Gracias por contactarnos!");
    } catch (error) {
      console.error("Error al abrir WhatsApp", error);
      alert("No pudimos abrir WhatsApp. Por favor, verifica que tengas la aplicación instalada o intenta más tarde.");
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-[999] animate-bounce-slow"
      title="Contactar por WhatsApp"
    >
      <button
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center border-2 border-white/20"
      >
        <FaWhatsapp size={32} />
      </button>
    </div>
  );
};

export default WhatsAppButton;