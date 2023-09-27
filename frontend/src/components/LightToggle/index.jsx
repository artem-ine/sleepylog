import React, { useState, useEffect } from "react";
import { RiLightbulbLine } from "react-icons/ri";

function LightToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("themePreference") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);

    localStorage.setItem("themePreference", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <button onClick={toggleTheme} className="light-toggle">
      <RiLightbulbLine />
    </button>
  );
}

export default LightToggle;
