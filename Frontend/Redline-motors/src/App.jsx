import React from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Hero from "./Components/Hero/Hero.jsx";
import Category from "./Components/Category/Category.jsx";
import Category2 from "./Components/Category/Category2.jsx";

const  App = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
      <Hero />
      </div>
      <Category />
      <Category2 />
    </div>
  );
}

export default App;