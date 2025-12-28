import React from 'react'
import Button from '../shared/Button';
import Car2 from '../../assets/images/Car2.png';
import Tool from '../../assets/images/Llave_inglesa.png';
import Spray_gun from '../../assets/images/Spray_gun.png';

function Category() {
    return (
        <div className='py-8'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Primera columna (Doble ancho) - Coches */}
                    <div className='col-span-2 py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                        <div>
                            <div className='mb-4'>
                                <p className='mb-[2px] text-gray-400'>Disfruta</p>
                                <p className='text-2xl font-semibold mb-[2px]'>Con nuestros</p>
                                <p className='text-4xl xl:text-5xl font-bold opacity-40 mb-2'>Coches</p>
                                <Button
                                    text="Explorar"
                                    bgColor="bg-red-600"
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                        <img src={Car2} alt="Coches" className='w-[320px] absolute top-1/2 -translate-y-1/2 -right-0' />
                    </div>

                    {/* Segunda columna - Servicio/Mantenimiento */}
                    <div className='py-10 pl-5 bg-gradient-to-br from-lime-600/90 to-blue-800/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                        <div>
                            <div className='mb-4'>
                                <p className='mb-[2px] text-white'>Disfruta</p>
                                <p className='text-2xl font-semibold mb-[2px]'>De nuestro</p>
                                <p className='text-4xl xl:text-5xl font-bold opacity-50 mb-2'>Taller</p> 
                                <Button
                                    text="Explorar"
                                    bgColor="bg-red-600"
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                        <img src={Tool} alt="Herramientas" className='w-[220px] -right-5 absolute lg:top-[40px] rotate-120' /> 
                    </div>

                    {/* Tercera columna - Pintura */}
                    <div className='py-10 pl-5 bg-gradient-to-br from-red-600/90 to-blue-800/70 text-white rounded-3xl relative h-[320px] flex items-end'>
                        <div>
                            <div className='space-y-1 mb-4'>
                                <p className='text-white'>Disfruta</p>
                                <p className='text-2xl font-semibold'>Nueva</p>
                                <p className='text-4xl xl:text-5xl font-bold opacity-80 mb-2'>Pintura</p>
                                <Button
                                    text="Explorar"
                                    bgColor="bg-white"
                                    textColor="text-black"
                                />
                            </div>
                        </div>
                        <img src={Spray_gun} alt="Pintura" className='w-[180px] absolute top-1/3 -translate-y-1/2 -right-0' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category