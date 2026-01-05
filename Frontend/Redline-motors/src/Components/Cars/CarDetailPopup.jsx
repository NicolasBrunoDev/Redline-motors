import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SharePopup from '../Popups/SharePopup.jsx';

// 1. COMPONENTE DE RESEÑAS (Cambiado el nombre correcto)
const ReviewSection = ({ car, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return alert("Selecciona una puntuación");
    setSubmitting(true);

    const newReview = {
      userName: "Cliente Redline",
      stars: rating,
      comment: comment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch(`http://localhost:8080/api/cars/${car.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });

      if (response.ok) {
        setRating(0);
        setComment("");
        if (onReviewAdded) onReviewAdded();
      }
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-black/40 p-8 border-t border-white/5 mt-4">
      <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-6 inline-block border-b-2 border-red-700 pb-1">
        Experiencias de Usuarios
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Deja tu valoración</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-all ${star <= rating ? 'text-red-700 scale-110' : 'text-gray-700 hover:text-red-900'}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-xs focus:border-red-700 outline-none transition-all h-24 resize-none"
            placeholder="Escribe tu opinión sobre el vehículo..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-red-800 disabled:opacity-50 transition-all"
          >
            {submitting ? 'Enviando...' : 'Publicar Comentario'}
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-red-700">
          {car.reviews?.length > 0 ? (
            car.reviews.map((rev, idx) => (
              <div key={idx} className="border-b border-white/5 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-[11px] font-bold uppercase">{rev.userName}</span>
                  <div className="flex text-red-700 text-[10px]">
                    {"★".repeat(rev.stars)}{"☆".repeat(5 - rev.stars)}
                  </div>
                </div>
                <p className="text-gray-400 text-xs italic leading-relaxed">"{rev.comment}"</p>
                <span className="text-[9px] text-gray-600 uppercase mt-2 block">{rev.date}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-xs uppercase tracking-widest italic">Aún no hay reseñas para este auto.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. COMPONENTE DE POLÍTICAS
const ProductPolicies = () => {
  const policies = [
    { title: "Normas de la casa", description: "El vehículo se entrega con el tanque lleno y debe devolverse en las mismas condiciones." },
    { title: "Salud y seguridad", description: "Vehículo sanitizado bajo protocolo premium. Seguro de cobertura completa." },
    { title: "Política de cancelación", description: "Cancelación sin cargo hasta 48 horas antes de la reserva." }
  ];

  return (
    <div className="w-full bg-black/20 p-8 border-t border-white/5 mt-auto">
      <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-8 inline-block border-b-2 border-red-700 pb-1">
        Políticas del Producto
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {policies.map((policy, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-red-700 font-bold uppercase text-[11px] tracking-widest">{policy.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. COMPONENTE PRINCIPAL (Sin redeclarar)
const CarDetailPopup = ({ car, onClose, currentUser, onReviewAdded }) => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    if (car && car.images && car.images.length > 0) {
      setSelectedImg(car.images[0]);
    }
  }, [car]);

  // UNIFICACIÓN DE LÓGICA DE RESERVA
  const handleRentClick = () => {
    if (!acceptedTerms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    if (!currentUser) {
      localStorage.setItem("redirectAfterLogin", `/reserve/${car.id}`);
      navigate("/login", {
        state: { message: "Debes iniciar sesión para realizar una reserva. Si no tienes cuenta, por favor regístrate." }
      });
      onClose();
    } else {
      onClose();
      navigate(`/reserve/${car.id}`);
    }
  };

  const isButtonDisabled = !car.available || (currentUser && !acceptedTerms);

  if (!car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
        <div className="absolute inset-0" onClick={onClose}></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-6xl overflow-hidden relative shadow-2xl max-h-[95vh] overflow-y-auto z-10"
        >
          {/* Botón cerrar */}
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-red-600 text-3xl z-20">
            &times;
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[500px]">
            {/* Imagen principal */}
            <div className="md:col-span-6 bg-black flex items-center justify-center p-4">
              <img src={selectedImg} alt={car.name} className="w-full h-full object-contain max-h-[500px]" />
            </div>

            {/* Miniaturas */}
            <div className="md:col-span-1 bg-gray-800/50 p-4 flex md:flex-col gap-4 overflow-x-auto">
              {car.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setSelectedImg(img)}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${selectedImg === img ? 'border-red-600' : 'border-white/10'}`}
                />
              ))}
            </div>

            {/* Detalles */}
            <div className="md:col-span-5 p-8 flex flex-col bg-gray-900 border-l border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-700 font-bold uppercase tracking-widest text-[15px]">{car.brand}</span>
                <span className="bg-red-700/10 text-red-600 text-[15px] px-5 py-0.5 rounded-full border border-red-700/20 uppercase font-bold">
                  {car.category}
                </span>
                <button onClick={() => setIsShareOpen(true)} className="text-gray-400 hover:text-white text-[15px] uppercase font-black bg-white/5 px-3 py-1 rounded-full mr-5">
                  Compartir
                </button>
              </div>
              <h2 className="text-white text-3xl font-black uppercase tracking-tighter">{car.name}</h2>

              <div className="h-1 w-16 bg-red-700 my-4"></div>

              <div>
                {/* Características (Igual que antes) */}
                {car.features?.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-3">Especificaciones</p>
                    <div className="grid grid-cols-3 gap-2">
                      {car.features.map((feat, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-center min-h-[50px]">
                          <p className="text-[7px] text-gray-500 uppercase font-bold leading-none mb-1">{feat.name}</p>
                          <p className="text-white text-[10px] font-black italic uppercase">{feat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Checkbox Términos */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="w-4 h-4 accent-red-700"
                />
                <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  Acepto los términos y condiciones
                </label>
              </div>

              <div className="mt-auto">
                <p className="text-gray-500 text-[9px] uppercase font-bold mb-1">Precio por día</p>
                <p className="text-white text-3xl font-bold mb-6">{car.priceDay} <span className="text-sm font-normal text-gray-500">/ jornada</span></p>

                <button
                  onClick={handleRentClick}
                  // Bloqueado si no hay auto disponible O no se aceptaron términos
                  disabled={!car.available || !acceptedTerms}
                  className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg uppercase text-xs tracking-widest
                      ${(car.available && acceptedTerms)
                      ? 'bg-red-700 hover:bg-red-800 text-white shadow-red-900/20 active:scale-[0.98]'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-40'}`}
                >
                  {!car.available
                    ? 'No disponible'
                    : !acceptedTerms
                      ? 'Acepta los términos y condiciones'
                      : (currentUser ? 'Reservar ahora' : 'Inicia sesión para reservar')}
                </button>
              </div>
            </div>
          </div>

          <ReviewSection car={car} onReviewAdded={onReviewAdded} />
          <ProductPolicies />
        </motion.div>
        <SharePopup isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} car={car} />
      </div>
    </AnimatePresence>
  );
};

export default CarDetailPopup;