import React from 'react'
import Button from '../shared/Button.jsx';

const ProductCard = ({data}) => {
  return (
    <div className='mb-10 pl-20'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center'>

        {/*card section*/}
        {data.map((item) => ( // Item en vez de data para evitar confusion (Deberia cambiarlo, me confunde igual)
          <div  
          data-aos="fade-up" 
          data-aos-delay={item.aosDelay}
          className='group' 
          key={item.id}>
            <div className='relative'>
              <img 
                src={item.image} 
                alt={item.title} 
                className='h-32 w-64 object-contain bg-white rounded-md p-2 shadow-sm' 
              />
              
              {/* hover button */}
              <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
                h-full w-full text-center 
                group-hover:backdrop-blur-sm 
                justify-center items-center duration-200 rounded-md bg-black/20'> 
                <Button 
                  text={"Add to Cart"}
                  bgColor={"bg-red-600 hover:bg-red-700"}
                  textColor={"text-white"}
                />
              </div>
            </div>
            <div className='leading-7 mt-2 products-text'>
              <h2 className='font-semibold'>{item.title}</h2>
              <h2 className='font-bold'>{item.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCard