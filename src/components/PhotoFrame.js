import React, { useState, useEffect } from "react";
import "./PhotoFrame.css";

const PhotoFrame = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: "25°C",
    description: "Soleado",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Aquí puedes integrar una API de clima para actualizar los datos dinámicamente
  // En este caso, los datos del clima son estáticos para el ejemplo.

  return (
    <div className="photo-frame">
        <div
        className="blur-background"
        style={{
          backgroundImage: `url("/photos/photo10.jpg")`,
        }}
      ></div>
      <div
        className="photo-background"
        style={{
          backgroundImage: `url("/photos/photo10.jpg")`,
        }}
      >
        <div className="info-container">
          <div className="time">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="weather">
            <div className="temperature">{weather.temperature}</div>
            <div className="description">{weather.description}</div>
          </div>
          <div className="sol"
            style={{
                backgroundImage: `url("/recursos/sol.webp")`,
            }}>
        </div>
        </div>
        
        <button className="menu-button">☰</button>
      </div>
    </div>
  );
}
export default PhotoFrame;
