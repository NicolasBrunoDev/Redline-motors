import React from 'react'
import Heading from '../shared/Heading.jsx'
import ProductCard from './ProductCard.jsx';

//images import

import Casco1 from '../../assets/images/Products/Casco_Vertigo_Dominum_Special_Edition.png';
import Casco2 from '../../assets/images/Products/Beon-711-Rebatible.png';
import Casco3 from '../../assets/images/Products/Fly-F-9.png';
import Casco4 from '../../assets/images/Products/Virtue-Rebatible.png';
import Casco5 from '../../assets/images/Products/Ya-966-rebatible.png';

const ProductsData=[
    {
        id: 1,
        name: "Casco Vertigo Dominum Special Edition",
        image: Casco1,
        title: "Premium Motorcycle Helmet",
        price: "$299.99",
        aosDelay:"0"
    },
        {
        id: 2,
        name: "Casco Vertigo Dominum Special Edition",
        image: Casco2,
        title: "Premium Motorcycle Helmet",
        price: "$299.99",
        aosDelay:"200"
    },
    {
        id: 3,
        name: "Casco Vertigo Dominum Special Edition",
        image: Casco3,
        title: "Premium Motorcycle Helmet",
        price: "$299.99",
        aosDelay:"400"
    },
    {
        id: 4,
        name: "Casco Vertigo Dominum Special Edition",
        image: Casco4,
        title: "Premium Motorcycle Helmet",
        price: "$299.99",
        aosDelay:"600"
    },
    {
        id: 5,
        name: "Casco Vertigo Dominum Special Edition",
        image: Casco5,
        title: "Premium Motorcycle Helmet",
        price: "$299.99",
        aosDelay:"800"
    },

]


function Products() {
  return (
    <div>
        <div className="container">
            {/* Header Section*/}
                <Heading title="Our Products" subtitle="Browse through our exclusive collection of motorcycles and accessories. Find the perfect ride that matches your style and performance needs. Explore now and experience the thrill of the open road!" />
             {/* Body Section*/}
             <ProductCard data= {ProductsData} />
        </div>
    </div>
  )
}

export default Products