import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPopup = ({ authPopup, setAuthPopup, authMessage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const response = await fetch(`http://localhost:8080/api/auth${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (isLogin) {
          const userData = await response.json(); 
          localStorage.setItem("user", JSON.stringify(userData));
          
          setAuthPopup(false);

          // LÓGICA DE REDIRECCIÓN POST-RESERVA
          const pendingRedirect = localStorage.getItem("redirectAfterLogin");
          if (pendingRedirect) {
            localStorage.removeItem("redirectAfterLogin");
            window.location.href = pendingRedirect; // Redirigir a la página de reserva
          } else {
            window.location.reload(); 
          }
        } else {
          alert("Registro exitoso. Por favor, inicia sesión.");
          setIsLogin(true);
        }
      } else {
        const errorText = await response.text();
        alert("Error: " + errorText);
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <AnimatePresence>
      {authPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 border border-red-700 p-8 rounded-3xl w-[380px] relative text-white shadow-2xl"
          >
            {/* --- CRITERIO DE ACEPTACIÓN: MENSAJE OBLIGATORIO --- */}
            {authMessage && isLogin && (
              <div className="mb-6 p-4 bg-red-700/20 border border-red-700/50 rounded-xl">
                <p className="text-red-500 text-xs font-bold text-center uppercase tracking-tight">
                  {authMessage}
                </p>
              </div>
            )}

            <button
              onClick={() => setAuthPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">
              {isLogin ? 'INICIAR' : 'CREAR'} <span className="text-red-700">SESIÓN</span>
            </h2>

            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:border-red-600 outline-none transition-all"
                  onChange={handleChange}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:border-red-600 outline-none transition-all"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:border-red-600 outline-none transition-all"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl transition-all mt-4 uppercase tracking-wider active:scale-95 shadow-[0_0_20px_rgba(185,28,28,0.3)]"
              >
                {isLogin ? 'Entrar ahora' : 'Registrarme'}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-400">
              {isLogin ? "¿No tienes cuenta aún?" : "¿Ya eres miembro?"}
              <span
                className="text-red-600 cursor-pointer ml-2 font-bold hover:underline transition-all"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Crea una aquí' : 'Inicia sesión'}
              </span>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopup;