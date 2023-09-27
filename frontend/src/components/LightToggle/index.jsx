import React, { useState, useEffect } from "react";
import { RiLightbulbLine } from "react-icons/ri";

function LightToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <button onClick={toggleTheme} className="light-toggle">
      <RiLightbulbLine />
    </button>
  );
}

export default LightToggle;
