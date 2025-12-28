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
        name: "Premium Motorcycle Helmet",
        image: Casco1,
        title: "Casco Vertigo Dominum Special Edition",
        price: "$299.99",
        aosDelay:"0"
    },
        {
        id: 2,
        name: "Premium Motorcycle Helmet",
        image: Casco2,
        title: "Beon 711 Rebatible",
        price: "$299.99",
        aosDelay:"200"
    },
    {
        id: 3,
        name: "Premium Motorcycle Helmet",
        image: Casco3,
        title: "Fly F9",
        price: "$299.99",
        aosDelay:"400"
    },
    {
        id: 4,
        name: "Premium Motorcycle Helmet",
        image: Casco4,
        title: "Virtue Rebatible",
        price: "$299.99",
        aosDelay:"600"
    },
    {
        id: 5,
        name: "Premium Motorcycle Helmet",
        image: Casco5,
        title: "Ya 996 Rebatible",
        price: "$299.99",
        aosDelay:"800"
    },

]


function Products() {
  return (
    <div>
        <div className="container">
            {/* Header Section*/}
                <Heading title="Nuestros Productos" subtitle="Explora nuestra exclusiva colección de motocicletas y accesorios. Encuentra la máquina perfecta que se adapte a tu estilo y necesidades de rendimiento. ¡Echa un vistazo ahora y experimenta la adrenalina de la carretera!" />
             {/* Body Section*/}
             <ProductCard data= {ProductsData} />
        </div>
    </div>
  )
}

export default Products