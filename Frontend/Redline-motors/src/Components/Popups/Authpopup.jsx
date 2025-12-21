import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPopup = ({ authPopup, setAuthPopup }) => {
  const [isLogin, setIsLogin] = useState(true); // Controla si mostramos Login o Registro
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Función para capturar lo que el usuario escribe
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función principal para enviar datos a Java
  const handleAuth = async (e) => {
    e.preventDefault();
    
    // El endpoint cambia según si es login o registro
    const endpoint = isLogin ? '/login' : '/register';
    
    try {
      const response = await fetch(`http://localhost:8080/api/auth${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const message = await response.text();

      if (response.ok) {
        alert(message); // "Usuario registrado con éxito" o "Inicio de sesión exitoso"
        setAuthPopup(false); // Cerramos el popup
      } else {
        alert("Error: " + message);
      }
    } catch (error) {
      alert("Error de conexión: Asegúrate de que tu backend en IntelliJ esté corriendo.");
    }
  };

  return (
    <AnimatePresence>
      {authPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 border border-red-700 p-8 rounded-3xl w-[380px] relative text-white shadow-2xl"
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setAuthPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl"
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
                  className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:border-red-600 outline-none"
                  onChange={handleChange}
                  required
                />
              )}
              
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:border-red-600 outline-none"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-xl focus:border-red-600 outline-none"
                onChange={handleChange}
                required
              />

              <button 
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl transition-all mt-4 uppercase tracking-wider"
              >
                {isLogin ? 'Entrar ahora' : 'Registrarme'}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-400">
              {isLogin ? "¿No tienes cuenta aún?" : "¿Ya eres miembro?"}
              <span 
                className="text-red-600 cursor-pointer ml-2 font-bold hover:underline"
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