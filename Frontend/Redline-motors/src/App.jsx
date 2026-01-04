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
import AdminPanel from "./Components/Admin/AdminPanel.jsx"
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import ReservationPopup from "./Components/Popups/ReservationPopup.jsx";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [authPopup, setAuthPopup] = React.useState(false);
  const [view, setView] = React.useState("tienda");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showReservation, setShowReservation] = React.useState(false);
  const [selectedCarForReservation, setSelectedCarForReservation] = React.useState(null);
  

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

  const handleOpenReservation = (car) => {
    setSelectedCarForReservation(car);
    setShowReservation(true);
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

const location=useLocation();

React.useEffect(() => {
    if (location.pathname === "/admin") {
      setView("admin");
    }
  }, [location]);

  return (
    <div className="overflow-hidden"> 
      {/* Navbar ahora puede cambiar la vista a 'admin' si es necesario */}
      <Navbar setAuthPopup={setAuthPopup} setView={setView} view= {view} currentUser={currentUser} handleLogout={handleLogout} />
      
      {/* Selector de Vista: Solo lo mostramos si NO estamos en el panel de admin */}
      {view !== "admin" && (
        <div className="flex justify-center gap-10 pt-20 pb-5" data-aos="fade-up">
          <button 
            onClick={() => setView("tienda")}
            className={`text-xl font-bold px-10 rounded-xl bg-gray-900/80 transition-all ${view === 'tienda' ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-500'}`}
          >
            TIENDA
          </button>
          <button 
            onClick={() => setView("reservas")}
            className={`text-xl font-bold px-10 rounded-xl bg-gray-900/80 transition-all ${view === 'reservas' ? 'text-red-700 border-b-2 border-red-700' : 'text-gray-500'}`}
          >
            RESERVAS
          </button>
        </div>
      )}

      <main>
        {view === "tienda" && (
          <div data-aos="fade-up">
            <Hero />
            <p className="pl-11 pt-5 text-4xl font-bold categories-hero">Categories</p>
            <Category />
            <Category2 />
            <Services />
            <Banner />
            <Products />
            <Banner2 />
            <Blogs />
          </div>
        )}

        {view === "reservas" && (
          <div data-aos="fade-in">
            <Reserva />
            <CarSlider  currentUser={currentUser} onRentClick={handleOpenReservation}/>
            <CarSlider  currentUser={currentUser} categoryFilter={"Deportivo"} onRentClick={handleOpenReservation}/>
            <CarSlider  currentUser={currentUser} categoryFilter={"Lujo"} onRentClick={handleOpenReservation}/>
            <CarSlider  currentUser={currentUser} categoryFilter={"Urbano"} onRentClick={handleOpenReservation}/>
            <CarSlider  currentUser={currentUser} categoryFilter={"Economico"} onRentClick={handleOpenReservation}/>
          </div>
        )}

        {view === "admin" && (
          <div data-aos="zoom-in">
            {currentUser?.role === "ADMIN" ? (
              <AdminPanel />
            ) : (
              <div className="h-screen flex items-center justify-center text-white text-2xl">
                Acceso Denegado. No eres administrador.
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <Cartpopup orderPopup={orderPopup} setOrderPopup={setOrderPopup}/>
      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />
      <ReservationPopup show={showReservation} car={selectedCarForReservation} onClose={() => setShowReservation(false)} />
    </div>
  );
}

export default App;