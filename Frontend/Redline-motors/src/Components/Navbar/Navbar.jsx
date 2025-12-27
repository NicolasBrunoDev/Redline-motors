import React from 'react';
import { NavbarMenu } from '../mockData/data.js';
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu.jsx';
import DarkMode from './DarkMode.jsx';

// 1. Añadimos currentUser y handleLogout a las props
const Navbar = ({ setAuthPopup, currentUser, handleLogout }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-gradient-to-b from-gray-950/90 to-gray-950/80">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">

          {/* Logo Section */}
          <div className="text-amber-50 text-2xl flex items-center gap-2 font-bold py-2">
            <p>Redline</p>
            <p className='text-red-700'>Motors</p>
            <p className='hidden lg:inline text-sm font-normal opacity-70'>
              | Deja tus preocupaciones en la puerta
            </p>
          </div>

          {/* Right Side Section */}
          <div className='flex items-center gap-4'>

            {/* Desktop Menu */}
            <div className='hidden md:block'>
              <ul className='flex items-center gap-6 text-gray-50'>
                {NavbarMenu.map((item) => {
                  // Definimos qué títulos queremos ocultar cuando hay sesión
                  const authTitles = ["Crear Cuenta", "Iniciar Sesion", "Iniciar Sesión"];
                  const isAuthOption = authTitles.includes(item.title);

                  // SI hay usuario Y la opción es de las de auth, NO renderizamos nada
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

                {/* Mostrar nombre de usuario si existe */}
                {currentUser && (
                  <li className="flex items-center gap-4 border-l border-gray-700 pl-4">
                    <span className="text-red-700 font-bold">●</span>
                    <span className="text-white text-sm uppercase">{currentUser.name}</span>
                    <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-700 underline">
                      SALIR
                    </button>
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

      {/* 4. También pasamos los datos al menú móvil */}
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