import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

function ResponsiveMenu({ open, setAuthPopup, currentUser, handleLogout }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-red-700 text-white py-10 m-6 rounded-3xl shadow-2xl">
            <ul className='flex flex-col justify-center items-center gap-10'>
              
              {/* Si NO hay usuario, mostramos opciones de acceso */}
              {!currentUser ? (
                <>
                  <li 
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={() => { setAuthPopup(true); }}
                  >
                    Crear Cuenta
                  </li>
                  <li 
                    className="cursor-pointer hover:text-black transition-colors"
                    onClick={() => { setAuthPopup(true); }}
                  >
                    Iniciar Sesion
                  </li>
                </>
              ) : (
                /* Si HAY usuario, mostramos su nombre y cerrar sesión */
                <>
                  <li className="text-gray-900 font-bold border-b border-white/20 pb-2">
                    BIENVENIDO, {currentUser.name}
                  </li>
                  <li 
                    className="cursor-pointer bg-white text-red-700 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all"
                    onClick={handleLogout}
                  >
                    CERRAR SESIÓN
                  </li>
                </>
              )}

              <li className="text-sm opacity-70">Redline Motors © 2024</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ResponsiveMenu;