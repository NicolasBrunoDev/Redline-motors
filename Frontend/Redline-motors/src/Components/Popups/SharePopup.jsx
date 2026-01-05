import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SharePopup = ({ isOpen, onClose, car }) => {
  const [customMessage, setCustomMessage] = useState(`¡Mira este increíble ${car.name}!`);
  
  if (!isOpen) return null;

  // URL del producto (ajusta según tu dominio real)
  const shareUrl = window.location.href; 
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(customMessage)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(customMessage)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(customMessage + " " + shareUrl)}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 border border-white/10 p-6 rounded-3xl max-w-md w-full shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-black uppercase tracking-tighter">Compartir Vehículo</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl">&times;</button>
          </div>

          {/* Contenido para compartir (Criterio: Imagen y descripción) */}
          <div className="flex gap-4 mb-6 bg-white/5 p-3 rounded-2xl border border-white/5">
            <img src={car.images[0]} alt={car.name} className="w-20 h-20 object-cover rounded-xl" />
            <div>
              <p className="text-white font-bold text-sm uppercase">{car.name}</p>
              <p className="text-gray-500 text-[10px] line-clamp-2 uppercase mt-1">{car.brand} - {car.category}</p>
            </div>
          </div>

          {/* Mensaje Personalizado (Criterio: Área de edición) */}
          <div className="mb-6">
            <label className="text-[10px] text-red-700 font-black uppercase tracking-widest block mb-2">Tu Mensaje</label>
            <textarea 
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-xs focus:border-red-700 outline-none h-20 resize-none"
            />
          </div>

          {/* Opciones de Redes (Criterio: Selección específica) */}
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleShare('facebook')} className="bg-[#1877F2] text-white py-3 rounded-xl flex flex-col items-center gap-1 hover:brightness-110 transition-all">
              <span className="text-[10px] font-black uppercase tracking-tighter">Facebook</span>
            </button>
            <button onClick={() => handleShare('twitter')} className="bg-[#1DA1F2] text-white py-3 rounded-xl flex flex-col items-center gap-1 hover:brightness-110 transition-all">
              <span className="text-[10px] font-black uppercase tracking-tighter">Twitter</span>
            </button>
            <button onClick={() => handleShare('whatsapp')} className="bg-[#25D366] text-white py-3 rounded-xl flex flex-col items-center gap-1 hover:brightness-110 transition-all">
              <span className="text-[10px] font-black uppercase tracking-tighter">WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SharePopup;