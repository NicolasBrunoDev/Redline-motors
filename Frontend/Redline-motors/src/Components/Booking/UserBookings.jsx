import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const UserBookings = ({ currentUser }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            console.log("Buscando reservas para el usuario ID:", currentUser.id);

            fetch(`http://localhost:8080/api/bookings/user/${currentUser.id}`)
                .then(res => {
                    console.log("Respuesta del servidor (status):", res.status);
                    return res.json();
                })
                .then(data => {
                    console.log("Datos recibidos del servidor:", data);
                    setBookings(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error en la petición:", err);
                    setLoading(false);
                });
        }
    }, [currentUser]);

    if (loading) return (
        <div className="h-screen bg-black flex items-center justify-center">
            <div className="text-white text-center py-20 uppercase tracking-widest animate-pulse font-black">
                Cargando historial...
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black pt-28 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-white text-4xl font-black uppercase tracking-tighter mb-8 italic">
                    Mis <span className="text-red-700">Reservas</span>
                </h1>

                <div className="space-y-4">
                    {bookings.length > 0 ? bookings.map((booking) => {

                        // --- Logica de Estado  ---
                        const today = new Date();
                        const endDate = new Date(booking.endDate + "T23:59:59");
                        const isPast = endDate < today;

                        return (
                            <div key={booking.id} className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-red-700/50 transition-all group">

                                {/* Miniatura del Auto */}
                                <div className="w-full md:w-32 h-20 bg-black rounded-xl overflow-hidden flex items-center justify-center">
                                    <img
                                        src={booking.car?.images?.[0]}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                                        alt="Auto"
                                    />
                                </div>

                                {/* Info de la reserva */}
                                <div className="flex-1">
                                    <h3 className="text-white font-bold uppercase tracking-tight text-lg">{booking.car?.name}</h3>
                                    <div className="flex gap-4 text-[10px] uppercase font-bold tracking-widest mt-1">
                                        <span className="text-gray-500">ID: #{booking.id}</span>

                                        {/* Etiqueta de Estado Dinámica */}
                                        <span className={`italic ${isPast ? 'text-gray-600' : 'text-green-500 animate-pulse'}`}>
                                            {isPast ? '• Finalizada' : '• Próxima'}
                                        </span>
                                    </div>
                                </div>

                                {/* Fechas */}
                                <div className="flex flex-col items-end gap-1">
                                    <div className="text-right">
                                        <p className="text-gray-400 text-[10px] uppercase font-black">Periodo de uso</p>
                                        <p className="text-white text-sm font-bold">
                                            {format(new Date(booking.startDate + "T00:00:00"), 'dd MMM', { locale: es })} - {format(new Date(booking.endDate + "T00:00:00"), 'dd MMM yyyy', { locale: es })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                            <p className="text-gray-600 uppercase font-bold tracking-widest">Aún no tienes kilómetros recorridos</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserBookings;