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
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import ReservationPopup from "./Components/Popups/ReservationPopup.jsx";
import SearchBar from "./Components/SearchBar/SearchBar.jsx";
import SearchPopup from "./Components/SearchBar/SearchPopup.jsx";
import FavoritesPopup from "./Components/Popups/FavoritesPopup.jsx";
import BookingPage from './Components/Booking/BookingPage.jsx';
import UserBookings from "./Components/Booking/UserBookings.jsx";
import WhatsAppButton from "./Components/WhatsApp/WhatsAppButton.jsx";
import CarDetailPopup from "./Components/Cars/CarDetailPopup.jsx";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [authPopup, setAuthPopup] = React.useState(false);
  const [view, setView] = React.useState("tienda");
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showReservation, setShowReservation] = React.useState(false);
  const [selectedCarForReservation, setSelectedCarForReservation] = React.useState(null);
  const [allCars, setAllCars] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isFavOpen, setIsFavOpen] = React.useState(false);
  const [userFavorites, setUserFavorites] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [showDetail, setShowDetail] = React.useState(false);

  // --- 1. EFECTO DE CARGA INICIAL  ---
  React.useEffect(() => {
    const initializeAppData = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      try {
        const [resCars, resCats] = await Promise.all([
          fetch("http://localhost:8080/api/cars/all"),
          fetch("http://localhost:8080/api/categories/all")
        ]);

        const carsData = await resCars.json();
        const catsData = await resCats.json();

        setAllCars(carsData);
        setCategories(Array.isArray(catsData) ? catsData : []);
      } catch (err) {
        console.error("Falla en la carga inicial:", err);
      }
    };

    initializeAppData();
  }, []);

  // --- 2. EFECTO DE SINCRONIZACIÓN (Reacciona cuando currentUser cambie) ---
  React.useEffect(() => {
    // Si hay un usuario y tiene favoritos, extraemos los IDs
    if (currentUser?.favoriteCars) {
      setUserFavorites(currentUser.favoriteCars.map(fav => fav.id));
    } else {
      // Si no hay usuario (logout), limpiamos los favoritos
      setUserFavorites([]);
    }
  }, [currentUser]); // Se ejecuta cada vez que currentUser se actualiza

  // 2. Filtrar autos en tiempo real
  const filteredCars = allCars.filter(car => {
    const search = searchTerm ? searchTerm.toLowerCase() : "";
    return (
      car.name.toLowerCase().includes(search) ||
      car.brand.toLowerCase().includes(search) ||
      (car.category && car.category.toLowerCase().includes(search))
    );
  });

  // 3. Manejador para cuando eligen un auto en la búsqueda
  const handleCarClickFromSearch = (car) => {
    setSelectedCarForReservation(car);
    setShowReservation(false);
    setShowDetail(true);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  // 3. Función global para manejar favoritos (Mover aquí desde CarSlider)
  const handleToggleFavorite = async (e, carId) => {
    if (e) e.stopPropagation();
    if (!currentUser) return;

    // Actualización visual rápida
    setUserFavorites(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );

    try {
      const res = await fetch(`http://localhost:8080/api/cars/${carId}/favorite?userId=${currentUser.id}`, {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        // Actualizar el objeto currentUser en memoria para que persista el cambio
        if (currentUser.favoriteCars) {
          if (data.isFavorite) {
            currentUser.favoriteCars.push({ id: carId });
          } else {
            currentUser.favoriteCars = currentUser.favoriteCars.filter(f => f.id !== carId);
          }
        }
      }
    } catch (err) {
      console.error("Error al marcar favorito:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload();
  };

  const handleOpenReservation = (car) => {
    setSelectedCarForReservation(car);
    setShowReservation(true);
  };


  const refreshData = async () => {
    try {
      const resCars = await fetch("http://localhost:8080/api/cars/all");
      const carsData = await resCars.json();
      setAllCars(carsData);

      const resCats = await fetch("http://localhost:8080/api/categories/all");
      const catsData = await resCats.json();
      setCategories(Array.isArray(catsData) ? catsData : []);
    } catch (err) {
      console.error("Error refrescando datos:", err);
    }
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

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/admin") {
      setView("admin");
    }
  }, [location]);

  return (
    <div className="overflow-hidden">
      {/* CONTENEDOR MAESTRO DE NAVEGACIÓN */}
      <header className="fixed top-0 left-0 w-full z-[100] flex flex-col bg-gradient-to-b from-gray-950/90 to-gray-950/80 shadow-md ">

        {/* El Navbar ahora se apila naturalmente arriba */}
        <Navbar
          setAuthPopup={setAuthPopup}
          setView={setView}
          view={view}
          currentUser={currentUser}
          handleLogout={handleLogout}
          setIsFavOpen={setIsFavOpen}
        />

        {/* El SearchBar aparece justo debajo sin necesidad de márgenes extraños */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchOpen={setIsSearchOpen}
        />

      </header>

      {/* IMPORTANTE: Espaciador para que el Hero no empiece detrás del header */}
      <div className="h-[130px] md:h-[150px]"></div>

      {/* Selector de Vista: Solo lo mostramos si NO estamos en el panel de admin */}
      {view !== "admin" && (
        <div className="flex justify-center gap-10 pt-5 pb-5" data-aos="fade-up">
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
        <Routes>
          {/* 1. RUTA PRINCIPAL: Maneja Tienda, Reservas y Admin mediante el estado 'view' */}
          <Route path="/" element={
            <>
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

                  {/* Slider General (Todos) */}
                  <CarSlider
                    currentUser={currentUser}
                    onRentClick={handleOpenReservation}
                    userFavorites={userFavorites}
                    onToggleFavorite={handleToggleFavorite}
                  />

                  {/* Sliders Inteligentes: Se crean según las categorías que existan en la BD */}
                  {categories.map((cat) => (
                    <CarSlider
                      key={cat.id}
                      currentUser={currentUser}
                      categoryFilter={cat.name}
                      onRentClick={handleOpenReservation}
                      userFavorites={userFavorites}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}

              {view === "admin" && (
                <div data-aos="zoom-in">
                  {currentUser?.role === "ADMIN" ? (
                    <AdminPanel onActionSuccess={refreshData} />
                  ) : (
                    <div className="h-screen flex items-center justify-center text-white text-2xl font-black uppercase">
                      Acceso Denegado. No eres administrador.
                    </div>
                  )}
                </div>
              )}
            </>
          } />

          {/* 2. NUEVA RUTA: Página de Reserva con Calendario */}
          <Route
            path="/reserve/:carId"
            element={<BookingPage currentUser={currentUser} />}
          />

          {/* 3. RUTA OPCIONAL: Si necesitas una página de login independiente */}
          <Route path="/login" element={
            <div className="h-screen flex items-center justify-center bg-black text-white">
              <p className="uppercase font-black tracking-widest">Por favor, inicia sesión usando el botón de la barra superior.</p>
            </div>
          } />

          {/* 4. NUEVA RUTA: Mis Reservas */}
          <Route
            path="/mis-reservas"
            element={<UserBookings currentUser={currentUser} />}
          />

        </Routes>
      </main>


      <WhatsAppButton />

      {/* COMPONENTES GLOBALES (Fuera de Routes) */}
      <Footer />

      <Cartpopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />

      <AuthPopup authPopup={authPopup} setAuthPopup={setAuthPopup} />

      <ReservationPopup
        show={showReservation}
        car={selectedCarForReservation}
        onClose={() => setShowReservation(false)}
      />

      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        filteredCars={filteredCars}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCarClick={handleCarClickFromSearch}
        categories={categories}
      />

      <FavoritesPopup
        isOpen={isFavOpen}
        onClose={() => setIsFavOpen(false)}
        favoriteCars={allCars.filter(car => userFavorites.includes(car.id))}
        onCarClick={(car) => {
          setSelectedCarForReservation(car);
          setIsFavOpen(false);
        }}
        onRemoveFavorite={handleToggleFavorite}
      />

      {showDetail && (
        <CarDetailPopup
          car={selectedCarForReservation}
          onClose={() => setShowDetail(false)}
          currentUser={currentUser}
          onReviewAdded={refreshData}
        />
      )}


    </div>
  );
};

export default App;