import React from 'react';
import { NavbarMenu } from '../mockData/data.js';
import { IoHome } from "react-icons/io5";
import { FaCrow, FaDumbbell } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import ResponsiveMenu from './ResponsiveMenu.jsx';


const  Navbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav className='bg-gray-950/80 shadow-md fixed top-0 left-0 w-full z-50'>
        <div className="container mx-auto flex items-center justify-between items-center py-2 ">
            {/*Logo Section*/ }
            <div className="text-amber-50 text-2xl flex items-center gap-2 font-bold py-2 ml-2">
                <FaCrow/>
                <p>Redline</p>
                <p className='text-red-700'>Motors</p>
            </div>
            {/*Menu Section*/ }
            <div className='hidden md:block'>
                <ul className='flex items-center gap-6 text-gray-50'>
                  {
                    NavbarMenu.map((item) => {
                      return <li key={item.id}>
                        <a href={item.link} className='inline-block py-1 px-3  hover:text-red-700 font-semibold'>{item.title}</a></li>
                  })}
                </ul>
            </div>
            {/* Mobile hamburger Menu section */}
             <div  className='md:hidden' onClick={() => setOpen(!open)}>
                  <RxHamburgerMenu className="text-4xl text-red-700 mr-2 font-bold"/>
             </div>
        </div>
      </nav>

        {/* Mobile Sidebar section */}
        <ResponsiveMenu open={open}/>
    </>
  )
}

export default Navbar