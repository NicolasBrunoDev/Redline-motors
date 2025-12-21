import React from 'react'
import { motion, AnimatePresence } from "framer-motion" // Nota: Asegúrate que la librería sea framer-motion o motion

function ResponsiveMenu({ open, setAuthPopup }) { // Recibimos la función aquí
  return (
    <AnimatePresence mode="wait">
        {open && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 left-0 w-full h-screen z-20"
            >
                <div className="text-xl font-semibold uppercase bg-red-700 text-white py-10 m-6 rounded-3xl">
                    <ul className='flex flex-col justify-center items-center gap-10'>
                        {/* Al hacer clic, abrimos el popup y podríamos cerrar el menú móvil */}
                        <li 
                          className="cursor-pointer hover:text-black transition-colors"
                          onClick={() => setAuthPopup(true)}
                        >
                          Crear Cuenta
                        </li>
                        <li 
                          className="cursor-pointer hover:text-black transition-colors"
                          onClick={() => setAuthPopup(true)}
                        >
                          Iniciar Sesion
                        </li>
                    </ul>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default ResponsiveMenu;