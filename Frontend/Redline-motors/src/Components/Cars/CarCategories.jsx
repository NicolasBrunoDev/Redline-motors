import React from 'react'
import Button from '../shared/Button';
import SportImg from '../../assets/images/Sport_Category.png';
import UrbanImg from '../../assets/images/Urban_Category.png';
import LuxuryImg from '../../assets/images/Luxury_Category.png';

function CarCategories() {
    return (
        <div className='py-8'>
            <div className='container mx-auto'>
                <h2 className="text-white text-3xl font-bold mb-8 uppercase px-5">
                    Nuestra <span className="text-red-700">Gama</span>
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-5'>
                    
                    {/* Categoria Deportivos */}
                    <div className='relative h-[250px] bg-gradient-to-r from-red-900 to-black rounded-3xl overflow-hidden group p-6 flex flex-col justify-end'>
                        <img src={SportImg} alt="Deportivos" className='absolute top-0 right-0 w-2/3 object-contain transition-transform group-hover:scale-110' />
                        <div className='relative z-10'>
                            <p className='text-red-500 font-bold'>Pura Adrenalina</p>
                            <h3 className='text-white text-3xl font-bold mb-4'>Deportivos</h3>
                            <Button text="Ver Todo" bgColor="bg-white" textColor="text-black" />
                        </div>
                    </div>

                    {/* Categoria Urbanos */}
                    <div className='relative h-[250px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl overflow-hidden group p-6 flex flex-col justify-end'>
                        <img src={UrbanImg} alt="Urbanos" className='absolute top-0 right-0 w-2/3 object-contain transition-transform group-hover:scale-110' />
                        <div className='relative z-10'>
                            <p className='text-gray-400 font-bold'>Ciudad y Confort</p>
                            <h3 className='text-white text-3xl font-bold mb-4'>Urbanos</h3>
                            <Button text="Ver Todo" bgColor="bg-red-700" textColor="text-white" />
                        </div>
                    </div>

                    {/* Categoria  Lujo*/}
                    <div className='relative h-[250px] bg-gradient-to-r from-yellow-700/50 to-black rounded-3xl overflow-hidden group p-6 flex flex-col justify-end'>
                        <img src={LuxuryImg} alt="Lujo" className='absolute top-0 right-0 w-2/3 object-contain transition-transform group-hover:scale-110' />
                        <div className='relative z-10'>
                            <p className='text-yellow-500 font-bold'>Exclusividad</p>
                            <h3 className='text-white text-3xl font-bold mb-4'>Lujo</h3>
                            <Button text="Ver Todo" bgColor="bg-white" textColor="text-black" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CarCategories;