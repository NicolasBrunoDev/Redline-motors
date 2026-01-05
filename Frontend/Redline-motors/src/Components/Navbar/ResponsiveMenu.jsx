import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from 'react-router-dom';

function ResponsiveMenu({ 
  open, 
  setOpen, 
  setAuthPopup, 
  currentUser, 
  handleLogout, 
  setIsFavOpen, 
  setView      
}) {
  const navigate = useNavigate();


  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-0 w-full h-screen z-[150]"
        >
          <div className="text-xl font-semibold uppercase bg-red-700 text-white py-10 m-6 rounded-3xl shadow-2xl">
            <ul className='flex flex-col justify-center items-center gap-8'>
              
              {!currentUser ? (
                <>
                  <li 
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={() => { setAuthPopup(true); setOpen(false); }}
                  >
                    Crear Cuenta
                  </li>
                  <li 
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={() => { setAuthPopup(true); setOpen(false); }}
                  >
                    Iniciar Sesion
                  </li>
                </>
              ) : (
                <>
                  <li className="text-gray-900 font-black border-b border-white/20 pb-2">
                    HOLA, {currentUser.name.split(' ')[0]}
                  </li>


                  <li 
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={() => { setIsFavOpen(true); setOpen(false); }}
                  >
                    Mis Favoritos
                  </li>

                  <li 
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={() => handleNav("/mis-reservas")}
                  >
                    Mis Reservas
                  </li>

                  {/* Solo si es ADMIN */}
                  {currentUser.role === "ADMIN" && (
                    <li 
                      className="cursor-pointer text-yellow-400 font-black hover:text-black transition-colors"
                      onClick={() => { setView("admin"); handleNav("/"); }}
                    >
                      Panel de Control
                    </li>
                  )}


                  <li 
                    className="cursor-pointer bg-white text-red-700 px-8 py-2 rounded-full font-bold hover:bg-black hover:text-white transition-all mt-4"
                    onClick={() => { handleLogout(); setOpen(false); }}
                  >
                    CERRAR SESIÓN
                  </li>
                </>
              )}

              <li className="text-[10px] opacity-50 tracking-widest mt-4">Redline Motors © 2024</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ResponsiveMenu;