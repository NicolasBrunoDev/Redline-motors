import react from "react";

const ReservationForm = () => {
  const [reserva, setReserva] = React.useState({
    serviceType: "Mecánica",
    vehicleModel: "",
    reservationDate: "",
    userEmail: ""
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/reservations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserva)
      });
      if (response.ok) alert("¡Reserva confirmada!");
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <form onSubmit={handleBooking} className="bg-gray-900 p-8 rounded-3xl border border-red-700">
      <h2 className="text-white text-2xl mb-6 font-bold">Agenda tu Cita</h2>
      
      <select 
        name="serviceType" 
        className="w-full mb-4 p-3 rounded-xl bg-gray-800 text-white"
        onChange={(e) => setReserva({...reserva, serviceType: e.target.value})}
      >
        <option value="Mecánica">Mecánica General</option>
        <option value="Personalización">Personalización (Tuning)</option>
      </select>

      <input 
        type="text" 
        placeholder="Modelo del Vehículo (ej: Skyline R34)" 
        className="w-full mb-4 p-3 rounded-xl bg-gray-800 text-white"
        onChange={(e) => setReserva({...reserva, vehicleModel: e.target.value})}
      />

      <input 
        type="datetime-local" 
        className="w-full mb-4 p-3 rounded-xl bg-gray-800 text-white"
        onChange={(e) => setReserva({...reserva, reservationDate: e.target.value})}
      />

      <button type="submit" className="w-full bg-red-700 text-white py-3 rounded-xl font-bold hover:bg-red-800 transition-all">
        CONFIRMAR RESERVA
      </button>
    </form>
  );
};