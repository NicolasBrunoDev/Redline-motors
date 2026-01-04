import React, { useState } from 'react';
import ReservationPopup from '../Popups/ReservationPopup.jsx'; 

function Reserva() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const abrirAgenda = (servicio) => {
    setSelectedService({ name: servicio });
    setShowPopup(true);
  };

  return (
    <div data-aos="fade-in" className="min-h-screen pt-10 px-10">
      <h1 className="text-white text-5xl font-bold text-center reservas-text">
        Reserva tu <span className="text-red-700">Service</span>
      </h1>
      <p className="text-gray-400 text-center mt-4">
        Agenda una cita en nuestro taller especializado.
      </p>
      
      <div 
        data-aos="fade-up" 
        data-aos-duration="600" 
        data-aos-delay="500" 
        className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
      >
        {/* Mecánica General */}
        <div className="bg-gray-900 p-10 rounded-3xl border border-red-700/30 hover:border-red-700 transition-all group">
          <h3 className="text-white text-2xl mb-4 uppercase font-black">Mecánica General</h3>
          <p className="text-gray-500 text-sm mb-6">Mantenimiento preventivo, frenos, motor y escaneo computarizado.</p>
          <button 
            onClick={() => abrirAgenda("Mecánica General")}
            className="bg-red-700 text-white px-8 py-3 rounded-full hover:bg-red-800 font-bold uppercase text-xs tracking-widest transition-all"
          >
            Agendar Cita
          </button>
        </div>

        {/* Personalización */}
        <div className="bg-gray-900 p-10 rounded-3xl border border-red-700/30 hover:border-red-700 transition-all group">
          <h3 className="text-white text-2xl mb-4 uppercase font-black">Personalización</h3>
          <p className="text-gray-500 text-sm mb-6">Modificaciones estéticas, performance, escapes y detailing premium.</p>
          <button 
            onClick={() => abrirAgenda("Personalización")}
            className="bg-red-700 text-white px-8 py-3 rounded-full hover:bg-red-800 font-bold uppercase text-xs tracking-widest transition-all"
          >
            Agendar Cita
          </button>
        </div>
      </div>

      {/* RENDER DEL POPUP */}
      <ReservationPopup 
        show={showPopup} 
        car={selectedService} 
        onClose={() => setShowPopup(false)} 
      />
    </div>
  );
}

export default Reserva;