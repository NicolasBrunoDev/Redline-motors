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
import Reserva from "./Components/Reservations/Reserva.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CarSlider from "./Components/Cars/CarSlider.jsx";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [authPopup, setAuthPopup] = React.useState(false);
  const [view, setView] = React.useState("tienda"); // Estado para controlar la vista
  const [currentUser, setCurrentUser] = React.useState(null);

React.useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    setCurrentUser(JSON.parse(savedUser));
  }
}, []);

const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload(); 
  };

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

      {/* 1. Navbar: Ahora recibe setView para poder cambiar de pestaña */}
      <Navbar setAuthPopup={setAuthPopup} setView={setView} currentUser={currentUser} handleLogout={handleLogout} />
      
      {/* 2. Selector de Vista*/}
      <div className="flex justify-center gap-10 pt-20 pb-5 rounded-b-xl"   data-aos="fade-up" data-aos-duration="500" data-aos-delay="true">
        <button 
          onClick={() => setView("tienda")}
          className={`text-xl font-bold  px-10 rounded-xl bg-gray-900/80 transition-all ${view === 'tienda' ? 'text-red-700 border-b-2 border-red-700 bg-gray-900' : 'text-white opacity-50'}`}
        >
          TIENDA
        </button>
        <button 
          onClick={() => setView("reservas")}
          className={`text-xl font-bold px-10 rounded-xl bg-gray-900/80 transition-all ${view === 'reservas' ? 'text-red-700 border-b-2 border-red-700 bg-gray-900' : 'text-white opacity-50'}`}
        >
          RESERVAS
        </button>
      </div>

      {/* 3. Contenido Condicional */}

      <main>

        {view === "tienda" ? (
          /* --- COMPONENTES DE LA TIENDA --- */
          <div data-aos="fade-up">
            <Hero />
            <p className="pl-11 pt-5 text-white text-4xl categories-hero">Categories</p>
            <Category />
            <Category2 />
            <Services />
            <Banner />
            <Products />
            <Banner2 />
            <Blogs />
          </div>
        ) 
        :
        (<>
          <Reserva />
          <CarSlider />
          </>
        )}
      </main>

      {/* 4. Footer siempre visible */}
      <Footer />
      
      {/* Popups siempre disponibles */}
      <Cartpopup orderPopup={orderPopup} setOrderPopup={setOrderPopup}/>
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
    </div>
  );
}

export default App;