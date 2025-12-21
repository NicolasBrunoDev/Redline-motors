import React from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Hero from "./Components/Hero/Hero.jsx";
import Category from "./Components/Category/Category.jsx";
import Category2 from "./Components/Category/Category2.jsx";
import Services from "./Components/Services/Services.jsx";
import Banner from "./Components/Banner/Banner.jsx";
import Products from "./Components/Products/Products.jsx";
import Banner2 from "./Components/Banner/Banner2.jsx";
import Blogs from "./Components/Blogs/Blogs.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Cartpopup from "./Components/Popups/Cartpopup.jsx";
import AuthPopup from "./Components/Popups/Authpopup.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  // --- NUEVA LÓGICA ---
  const [authPopup, setAuthPopup] = React.useState(false);

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="overflow-hidden"> 

      {/* Pasamos setAuthPopup a la Navbar para que los botones funcionen */}
      <Navbar setAuthPopup={setAuthPopup} />
      
      <div className="pt-20">
        <Hero />
      </div>
      
      <p className="pl-11 pt-5 text-white text-4xl categories-hero">Categories</p>
      <Category />
      <Category2 />
      <Services />
      <Banner />
      <Products />
      <Banner2 />
      <Blogs />
      <Footer />
      
      {/* Popups */}
      <Cartpopup orderPopup={orderPopup} setOrderPopup={setOrderPopup}/>
      
      {/* Nuevo Popup de Auth */}
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
    </div>
  );
}

export default App;