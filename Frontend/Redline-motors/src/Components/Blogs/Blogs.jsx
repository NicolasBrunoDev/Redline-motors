import React from 'react'
import Heading from '../shared/Heading.jsx'

import maintenanceImg from '../../Assets/Images/maintenance.jpg'
import engine from '../../Assets/Images/engine.jpg'
import gear from '../../Assets/Images/gear.jpg'

const BlogData = [
    {
        title: "Top 10: Consejos de Mantenimiento para tu Moto",
        description: "Descubre los cuidados esenciales para mantener tu máquina en perfectas condiciones y garantizar un viaje seguro.",
        date: "15 de Agosto, 2023",
        image: maintenanceImg,
        aosDelay: "0",
    },
    {
        title: "La Evolución del Diseño en las Motores",
        description: "Explora cómo han cambiado las líneas y la estética a través de las décadas, fusionando estilo con ingeniería avanzada.",
        date: "10 de Septiembre, 2023",
        image: engine,
        aosDelay: "200",
    },
    {
        title: "Equipamiento: Cómo elegir el casco y traje ideal",
        description: "Una guía completa para seleccionar la protección adecuada, priorizando tu seguridad y confort en cada kilómetro.",
        date: "5 de Octubre, 2023",
        image: gear,
        aosDelay: "400",
    }
]

const Blogs = () => {
  return (
    <div className='pl-5 pr-5'>
        <div className='container'>
        {/* Header Section*/}
                <Heading title="Recent News" subtitle="Explore our Blogs" />
        </div>

        {/* Blogs Section*/}
        <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7 place-items-center'>
            {/* Blog Card 1 */}
            {
                BlogData.map((data)=>(
                    <div         
                    data-aos="fade-up" 
                    data-aos-delay={data.aosDelay} >
                        {/* Image Section */}
                        <div className='overflow-hidden rounded-2xl mb-2'>
                            <img src={data.image} alt="" className=' w-full h-[220] object-cover rounded-2xl hover:scale-105 duration-500'/>
                        </div>
                        {/* Content Section */}
                        <div className='text-news-section'>
                            <h3 className="text-xl font-bold mb-2">{data.title}</h3>
                            <p className="text-gray-600 mb-2">{data.description}</p>
                            <p className="text-gray-500 text-sm">{data.date}</p>
                        </div>
                    </div>
                ))  
            }
        </div>

    </div>
  )
}

export default Blogs