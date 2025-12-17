import React from 'react';
import { NavbarMenu } from '../mockData/data.js';
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu.jsx';
import DarkMode from './DarkMode.jsx';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <nav className="
  fixed top-0 left-0 w-full z-50 shadow-md
  bg-gradient-to-b
  from-gray-950/90
  to-gray-950/80
">
        <div className="container mx-auto flex items-center justify-between py-2 px-4">
          
          {/* Logo Section */}
          <div className="text-amber-50 text-2xl flex items-center gap-2 font-bold py-2">
            <p>Redline</p>
            <p className='text-red-700'>Motors</p>
            {/* Ajusté a lg:inline para que no choque con el menú en tablets */}
            <p className='hidden lg:inline text-sm font-normal opacity-70'>
              | Deja tus preocupaciones en la puerta
            </p>
          </div>

          {/* Right Side Section (Menu + DarkMode + Mobile Icon) */}
          <div className='flex items-center gap-4'>
            
            {/* Desktop Menu */}
            <div className='hidden md:block'>
              <ul className='flex items-center gap-6 text-gray-50'>
                {NavbarMenu.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={item.link} 
                      className='inline-block py-1 px-3 hover:text-red-700 font-semibold transition-colors'
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dark Mode Component */}
            <div className='flex items-center'>
              <DarkMode />
            </div>

            {/* Mobile hamburger Menu section */}
            <div className='md:hidden flex items-center' onClick={() => setOpen(!open)}>
              <RxHamburgerMenu className="text-4xl text-red-700 font-bold cursor-pointer" />
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} />
    </>
  );
}

export default Navbar;