import React from "react";
import DarkButton from "../../assets/website/dark-mode.png";
import LightButton from "../../assets/website/light-mode.png";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ?  localStorage.getItem("theme") : "light"
);

const element = document.documentElement; // acces to html element


//set theme to localStorage and html class (LOCAL STORAGE TO REMEMBER THEME EVEN IF REFRESH)
React.useEffect(() => {
localStorage.setItem("theme", theme);
if (theme === "dark") {
  element.classList.add("dark");
  element.classList.remove("light");
} else {
    element.classList.remove("dark");
    element.classList.add("light");
}});


  return (
    <div className="relative">
        <img 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        alt="Light Mode"
        src={LightButton}  className={`w-12 cursor-pointer absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}/>
        <img 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        alt="Dark Mode"
        src={DarkButton}  className={`w-12 cursor-pointer`}/>
    </div>
  );
};

export default DarkMode;
