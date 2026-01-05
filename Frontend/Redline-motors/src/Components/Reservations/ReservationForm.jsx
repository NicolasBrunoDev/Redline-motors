import React, { useState } from 'react';

const ReservationForm = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    serviceType: 'Mecánica', 
    vehicleModel: '',
    reservationDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      serviceType: formData.serviceType,
      vehicleModel: formData.vehicleModel,
      reservationDate: formData.reservationDate, 
      user: { id: currentUser.id } 
    };

    try {
      const response = await fetch('http://localhost:8080/api/reservations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert("¡Reserva confirmada! Te esperamos en Redline Motors.");
        setFormData({ serviceType: 'Mecánica', vehicleModel: '', reservationDate: '' });
      } else {
        alert("Hubo un problema al crear la reserva.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl border border-red-700/50 shadow-2xl mt-10">
      <h2 className="text-3xl font-bold text-white mb-6 text-center uppercase tracking-widest">
        Agendar <span className="text-red-700">Cita</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selector de Servicio */}
        <div>
          <label className="text-gray-400 block mb-2 text-sm uppercase">Tipo de Servicio</label>
          <select 
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:border-red-600 outline-none transition-all"
          >
            <option value="Mecánica">Mecánica General</option>
            <option value="Personalización">Personalización / Tuning</option>
            <option value="Mantenimiento">Mantenimiento Preventivo</option>
          </select>
        </div>

        {/* Modelo del Vehículo */}
        <div>
          <label className="text-gray-400 block mb-2 text-sm uppercase">Modelo del Vehículo</label>
          <input 
            type="text"
            name="vehicleModel"
            placeholder="Ej: Nissan Skyline R34"
            required
            value={formData.vehicleModel}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:border-red-600 outline-none transition-all"
          />
        </div>

        {/* Fecha y Hora */}
        <div>
          <label className="text-gray-400 block mb-2 text-sm uppercase">Fecha y Hora</label>
          <input 
            type="datetime-local"
            name="reservationDate"
            required
            value={formData.reservationDate}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl focus:border-red-600 outline-none transition-all [color-scheme:dark]"
          />
        </div>

        {/* Botón de envío */}
        <button 
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-red-900/20 active:scale-95"
        >
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;