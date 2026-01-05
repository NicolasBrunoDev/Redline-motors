import React, { useState, useEffect } from 'react';
import { NavbarMenu } from '../mockData/data.js';
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu.jsx';
import DarkMode from './DarkMode.jsx';
import { Link } from 'react-router-dom';

const Navbar = ({ setView, view, setAuthPopup, currentUser, handleLogout, setIsFavOpen }) => {
  const [open, setOpen] = useState(false);

  // NOTA: Eliminamos el estado 'user' interno porque ya usamos 'currentUser' de las props.
  // Esto mantiene la sincronización perfecta con el login/logout.

  return (
    <>
      <nav className="w-full">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">

          {/* Logo Section */}
          <Link to="/" className="text-amber-50 text-2xl flex items-center gap-2 font-bold py-2">
            <p>Redline</p>
            <p className='text-red-700'>Motors</p>
            <p className='hidden lg:inline text-sm font-normal opacity-70'>
              | Deja tus preocupaciones en la puerta
            </p>
          </Link>

          {/* Right Side Section */}
          <div className='flex items-center gap-4'>

            {/* Desktop Menu */}
            <div className='hidden md:block'>
              <ul className='flex items-center gap-6 text-gray-50'>
                {NavbarMenu.map((item) => {
                  const authTitles = ["Crear Cuenta", "Iniciar Sesion", "Iniciar Sesión"];
                  const isAuthOption = authTitles.includes(item.title);

                  if (currentUser && isAuthOption) return null;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          if (isAuthOption) setAuthPopup(true);
                        }}
                        className='inline-block py-1 px-3 hover:text-red-700 font-semibold transition-colors uppercase'
                      >
                        {item.title}
                      </button>
                    </li>
                  );
                })}

                {/* --- BOTÓN MIS FAVORITOS (Para cualquier usuario logueado) --- */}
                {currentUser && (
                  <li>
                    <button
                      onClick={() => setIsFavOpen(true)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all border bg-transparent border-gray-600 text-gray-400 hover:border-red-700 hover:text-red-500"
                    >❤️ MIS FAVORITOS
                    </button>
                  </li>
                )}

                {/* --- BOTÓN PANEL ADMIN --- */}
                {currentUser && currentUser.role === "ADMIN" && (
                  <li>
                    <button
                      onClick={() => {
                        // Si ya estoy en admin, vuelvo a la tienda. Si no, entro al panel.
                        if (currentUser.role === "ADMIN" && view === "admin") {
                          setView("tienda");
                        } else {
                          setView("admin");
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${view === "admin"
                        ? "bg-red-700 text-white border-red-700 shadow-[0_0_15px_rgba(185,28,28,0.5)]"
                        : "bg-red-700/20 border-red-700 text-red-500 hover:bg-red-700 hover:text-white"
                        }`}
                    >
                      {view === "admin" ? "✖ CERRAR PANEL" : "🛡️ ADMIN"} {/* El emoji funciona como simbolo*/}
                    </button>
                  </li>
                )}

                {/* Mostrar nombre de usuario si existe */}
                {currentUser && (
                  <li className="flex items-center gap-4 border-l border-gray-700 pl-4">
                    <div className="flex flex-col items-end">
                      <span className="text-white text-xs font-bold uppercase tracking-tighter">
                        {currentUser.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="text-[10px] text-gray-500 hover:text-red-700 underline"
                      >
                        CERRAR SESIÓN
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Dark Mode */}
            <div className='flex items-center'>
              <DarkMode />
            </div>

            {/* Mobile hamburger */}
            <div className='md:hidden flex items-center' onClick={() => setOpen(!open)}>
              <RxHamburgerMenu className="text-4xl text-red-700 font-bold cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      <ResponsiveMenu
        open={open}
        setAuthPopup={setAuthPopup}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default Navbar;