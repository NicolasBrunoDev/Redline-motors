import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const BookingPage = ({ currentUser }) => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:8080/api/cars/${carId}`).then(res => res.json()),
      fetch(`http://localhost:8080/api/cars/${carId}/booked-dates`).then(res => res.json())
    ])
      .then(([carData, datesData]) => {
        setCar(carData);


        const formattedDates = datesData.map(reserva => ({
          from: new Date(reserva.start + "T00:00:00"),
          to: new Date(reserva.end + "T00:00:00")
        }));

        setBookedDates(formattedDates);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        setLoading(false);
      });
  }, [carId]);

const handleConfirmReservation = () => {
    if (!range.from || !range.to) return alert("Selecciona un rango de fechas");

    const reservationData = {
      carId: parseInt(carId),
      userId: currentUser?.id,
      startDate: format(range.from, 'yyyy-MM-dd'),
      endDate: format(range.to, 'yyyy-MM-dd')
    };

    console.log("Enviando reserva:", reservationData);

    fetch('http://localhost:8080/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    })
      .then(res => {
        if (res.ok) {
          alert(`¡Reserva confirmada para el ${car.name}!`);
          navigate('/');
        } else {
          alert("Error al guardar la reserva. Revisa la consola.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        alert("No se pudo conectar con el servidor");
      });
  };

  // --- 3. PANTALLA DE CARGA PREVENTIVA ---
  if (loading || !car) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white font-black uppercase tracking-widest text-xs">Calentando motores...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* COLUMNA IZQUIERDA: RESUMEN DEL AUTO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
            {/* Usamos Optional Chaining por si las imágenes tardan un poco más */}
            <img src={car.images?.[0]} alt={car.name} className="w-full h-48 object-contain mb-4" />
            <span className="text-red-700 text-[10px] font-black uppercase tracking-[0.2em]">{car.brand}</span>
            <h1 className="text-white text-3xl font-black uppercase tracking-tighter mb-2">{car.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
              <span>{car.category}</span>
              <span>•</span>
              <span className="text-red-600">{car.priceDay}/día</span>
            </div>
          </div>

          <div className="bg-red-700/5 border border-red-700/20 rounded-3xl p-6">
            <h3 className="text-white text-sm font-black uppercase mb-4">Tu Selección</h3>
            {range?.from ? (
              <div className="space-y-2">
                <p className="text-gray-400 text-xs">Desde: <span className="text-white font-bold">{format(range.from, 'PPP', { locale: es })}</span></p>
                {range.to && <p className="text-gray-400 text-xs">Hasta: <span className="text-white font-bold">{format(range.to, 'PPP', { locale: es })}</span></p>}
              </div>
            ) : (
              <p className="text-gray-500 text-xs italic">Selecciona fechas en el calendario</p>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: CALENDARIO */}
        <div className="lg:col-span-8 bg-gray-900 border border-white/10 rounded-3xl p-8">
          <h2 className="text-white text-xl font-black uppercase tracking-tighter mb-8 border-b border-red-700 pb-2 inline-block">
            Selecciona tus días de pista
          </h2>

          <div className="flex justify-center bg-black/40 p-6 rounded-2xl border border-white/5 calendar-redline">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              locale={es}
              disabled={[
                { before: new Date() },
                ...bookedDates
              ]}
              className="calendar-redline"
              modifiersStyles={{
                selected: { backgroundColor: '#b91c1c', color: 'white' },
                today: { color: '#ef4444', fontWeight: 'bold' }
              }}
            />
          </div>

          <button
            onClick={handleConfirmReservation}
            disabled={!range?.from || !range?.to}
            className={`w-full mt-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all
              ${(range?.from && range?.to)
                ? 'bg-red-700 hover:bg-red-800 text-white shadow-[0_0_30px_rgba(185,28,28,0.3)] active:scale-[0.98]'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
          >
            Confirmar Reserva
          </button>
        </div>
      </div>

      <style>{`
        .calendar-redline .rdp-day_selected { background-color: #b91c1c !important; color: white !important; }
        .calendar-redline .rdp-button:hover:not([disabled]) { background-color: #450a0a !important; color: white; }
        .rdp { --rdp-accent-color: #b91c1c; --rdp-background-color: #450a0a; color: white; }
      `}</style>
    </div>
  );
};

export default BookingPage;