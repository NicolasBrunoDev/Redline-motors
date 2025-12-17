import React from 'react'
import Button from '../shared/Button';
import Bike_Gloves from '../../assets/images/Motorcycle_gloves1.png';
import Moto3 from '../../assets/images/Moto3.png';
import Moto_helm2 from '../../assets/images/Motorcycle_helm2.png';


function Category() {
    return (
        <div className='py-8'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/*Primera columna*/}
                    <div className='py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px]
                flex items-end'>
                        <div>
                            <div className='mb-4'>
                                <p className='mb-[2px] text-gray-400'>Enjoy</p>
                                <p className='text-2xl font-semibold mb-[2px]'>With</p>
                                <p className='text-4xl xl:text-5xl font-bold opacity-40 mb-2'>Bike</p>
                                <Button
                                    text="Browse"
                                    bgColor="bg-red-600"
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                        <img src={Bike_Gloves} alt="" className='w-[320px] absolute bottom-0' />
                    </div>
                    {/*Segunda columna*/}
                    <div className='py-10 pl-5 bg-gradient-to-br from-lime-600/90 to-blue-800/70 text-white rounded-3xl relative h-[320px]
                flex items-end'>
                        <div>
                            <div className='mb-4'>
                                <p className='mb-[2px] text-white'>Enjoy</p>
                                <p className='text-2xl font-semibold mb-[2px]'>With</p>
                                <p className='text-4xl xl:text-5xl font-bold opacity-50 mb-2'>Bike</p>
                                <Button
                                    text="Browse"
                                    bgColor="bg-red-600"
                                    textColor="text-white"
                                />
                            </div>
                        </div>
                        <img src={Moto3} alt="" className='w-[320px] -right-4 absolute lg:top-[40px]' />
                    </div>
                    {/*Tercera columna*/}
                    <div className='col-span-2 py-10 pl-5 bg-gradient-to-br from-red-600/90 to-blue-800/70 text-white rounded-3xl relative h-[320px]
                flex items-end'>
                        <div>
                            <div className='space-y-1 mb-4'>
                                <p className='text-white'>Enjoy</p>
                                <p className='text-2xl font-semibold'>With</p>
                                <p className='text-4xl xl:text-5xl font-bold opacity-80 mb-2'>Helmet</p>
                                <Button
                                    text="Browse"
                                    bgColor="bg-white"
                                    textColor="text-black"
                                />
                            </div>
                        </div>
                        <img src={Moto_helm2} alt="" className='w-[320px] absolute top-1/2 -translate-y-1/2 -right-0' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category