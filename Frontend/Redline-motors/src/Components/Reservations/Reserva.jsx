import React from 'react'

function Reserva() {
  return (
              /* --- COMPONENTES DE RESERVAS --- */
          <div data-aos="fade-in" className="min-h-screen pt-10 px-10">
            <h1 className="text-white text-5xl font-bold text-center reservas-text">Reserva tu <span className="text-red-700">Service</span></h1>
            <p className="text-gray-400 text-center mt-4">Agenda una cita en nuestro taller especializado.</p>
            
            {/* Aqui van las reservas */}
            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="500" className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-gray-900 p-10 rounded-3xl border border-red-700/30">
                    <h3 className="text-white text-2xl mb-4">Mecanica General</h3>
                    <button  className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800">Agendar</button>
                </div>
                <div className="bg-gray-900 p-10 rounded-3xl border border-red-700/30">
                    <h3 className="text-white text-2xl mb-4">Personalizacion</h3>
                    <button className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-800">Agendar</button>
                </div>
            </div>
          </div>
  )
}

export default Reserva