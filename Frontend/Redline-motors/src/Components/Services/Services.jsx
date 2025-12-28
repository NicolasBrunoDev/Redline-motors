import React from 'react'
import {
    FaCarSide,
    FaHeadphonesAlt,
    FaWallet,
    FaCheckCircle,
} from "react-icons/fa";

const ServiceData = [
    {
        id: 1,
        icon: <FaCarSide className='text-4xl md:text-5xl text-red-500'/>,
        title: "Envío Gratis",
        description: "Entrega gratuita en pedidos superiores a $100",
    },
    {
        id: 2,
        icon: <FaHeadphonesAlt className='text-4xl md:text-5xl text-red-500'/>,
        title: "Soporte 24/7",
        description: "Asistencia técnica en cualquier momento",
    },
    {
        id: 3,
        icon: <FaWallet className='text-4xl md:text-5xl text-red-500'/>,
        title: "Pago Seguro",
        description: "Transacciones seguras sin cargos ocultos",
    },
    {
        id: 4,
        icon: <FaCheckCircle className='text-4xl md:text-5xl text-red-500'/>,
        title: "Garantía de Calidad",
        description: "Garantizamos la excelencia en todos nuestros servicios",
    },
]

function Services() {
  return (
    <div>
        <div className='container mt-14 md:my-20 mx-auto pl-5 pr-5'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8'>
                {ServiceData.map((data) => (
                        <div key={data.id} className='flex flex-col items-center sm:flex-row gap-4 text-red-500'>
                            {data.icon}
                            <div>
                                <h1 className='lg:text-xl font-bold'>{data.title}</h1>
                                <h1 className='text-gray-400 text-sm'>{data.description}</h1>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Services