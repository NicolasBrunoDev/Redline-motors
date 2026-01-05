import React from 'react';

const ProductPolicies = () => {
  const policies = [
    {
      title: "Normas de la casa",
      description: "El vehículo se entrega con el tanque lleno y debe devolverse igual. No se permite fumar dentro de la unidad. El conductor debe ser mayor de 21 años."
    },
    {
      title: "Salud y seguridad",
      description: "Protocolo de limpieza profunda tras cada reserva. Revisión técnica obligatoria cada 5,000 km. Asistencia en carretera 24/7 incluida."
    },
    {
      title: "Política de cancelación",
      description: "Cancelación gratuita hasta 48 horas antes del inicio de la reserva. Después de ese plazo, se aplicará un cargo del 50% del total."
    }
  ];

  return (
    <section className="w-full bg-gray-900/50 p-8 rounded-3xl mt-10 border border-white/5">
      {/* Título del bloque (Identificable y subrayado) */}
      <h2 className="text-white text-2xl font-black uppercase tracking-tighter mb-8 inline-block border-b-4 border-red-700 pb-1">
        Políticas del Producto
      </h2>

      {/* Distribución en columnas (Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div key={index} className="space-y-3">
            {/* Título de la política */}
            <h3 className="text-red-700 font-bold uppercase text-sm tracking-widest">
              {policy.title}
            </h3>
            {/* Descripción detallada */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPolicies;