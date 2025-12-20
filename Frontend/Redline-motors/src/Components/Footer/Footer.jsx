import React from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { FaMobileAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const FooterLinks = [
    {
        title:"Home",
        link:"#",
    },
    {
        title:"About",
        link:"/#about",
    },
    {
        title:"Contact",
        link:"/#contact",
    },
    {
        title:"Blog",
        link:"/#blog",
    },
]

function Footer() {
  return (
    <div className='text-footer border-t-2 border-red-600 mt-10'>
        <div className="container mx-auto">
            <div className="grid md:grid-cols-3 pb-20 pt-5">
                {/* company details */}
                <div className='py-8 px-4'>
                    <a href="#" className='text-red-600 font-semibold tracking-widest text-2xl 
                    uppercase sm:text-3xl'>Eshop</a>
                    <p className='text-gray-600  lg:pr-24 pt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Totam molestias quo tenetur obcaecati similique neque earum necessitatibus. </p>
                </div>
                {/* quick links */}
                <div className='col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10'>
                    <div className='py-8 px-4'>
                        <h1 className='text-xl font-bold sm:text-left mb-3'>
                            Important Links
                        </h1>
                        <ul>
                            {
                                FooterLinks.map(
                                    (data, index) => (
                                        <li key={index}>
                                            <a href={data.link} className='text-gray-600 hover:text-red-600 duration-300'>
                                                {data.title}
                                            </a>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    {/*Second Links */}
                    <div className='py-8 px-4'>
                        <h1 className='text-xl font-bold sm:text-left mb-3'>
                            Quick Links
                        </h1>
                        <ul>
                            {
                                FooterLinks.map(
                                    (data, index) => (
                                        <li key={index}>
                                            <a href={data.link} className='text-gray-600 hover:text-red-600 duration-300'>
                                                {data.title}
                                            </a>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    {/*Direccion/ ¿Domicilio?*/}
                <div className='py-8 px-4  col-span-2 sm:col-auto'>
                    <h1 className='text-xl font-bold sm:text-left mb-3'>Address</h1>
                        <div>
                            <div className='flex items-center gap-3'>
                                <FaLocationDot />
                                <p>123 Main Street, City, Country</p>
                            </div>
                            <div className='flex items-center gap-3 mt-6'>
                                <FaMobileAlt />
                                <p>+12 34567890</p>
                            </div>

                            {/* social links*/}
                            <div className='flex items-center gap-3 mt-6'>
                                <a href="#" className='text-3xl hover:text-primary duration-300'>
                                    <FaInstagram />
                                </a>
                                <a href="#" className='text-3xl hover:text-primary duration-200'>
                                    <FaFacebook />
                                </a>
                                <a href="#" className='text-3xl hover:text-primary duration-200'>
                                    <FaLinkedin />
                                </a>
                            </div>

                        </div>
                </div>
                </div>
                
                
            </div>
        </div>
    </div>
  )
}

export default Footer