import React, { useState, useEffect } from "react";
import "./PhotoFrame.css";
import { ReactComponent as IconChange } from '../icons/change.svg';
import { ReactComponent as IconEdit } from '../icons/edit.svg';
import { ReactComponent as IconEffect } from '../icons/effects.svg';
import { ReactComponent as IconSticker } from '../icons/sticker.svg';
import { ReactComponent as IconSun } from '../icons/sun.svg';

const PhotoFrame = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: "25°C",
    description: "Soleado",
  });
  const [backgroundImage, setBackgroundImage] = useState(
    "/photos/photo1.jpg"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [adornEffect, setAdornEffect] = useState("");
  const [isStickerPanelOpen, setIsStickerPanelOpen] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);

  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    saturation: 100,
    contrast: 100,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const images = [
    "/photos/photo1.jpg?text=Image+1",
    "/photos/photo2.jpg?text=Image+2",
    "https://via.placeholder.com/1200x800?text=Image+3",
    "https://via.placeholder.com/1200x800?text=Image+4",
  ];

  const stickerOptions = [
    "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif",
    "https://media.giphy.com/media/26xBukhKmwWzD8NqA/giphy.gif",
    "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif",
  ];

  const handleImageSelect = (image) => {
    setBackgroundImage(image);
    setIsModalOpen(false);
  };

  const handleAdjustmentChange = (e) => {
    const { name, value } = e.target;
    setAdjustments((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleAdorns = () => {
    if (adornEffect === "") {
      setAdornEffect("rain");
    } else if (adornEffect === "rain") {
      setAdornEffect("azules");
    } else if (adornEffect === "azules") {
      setAdornEffect("snow");
    } else {
      setAdornEffect("");
    }
  };

  const handleStickerSelect = (sticker) => {
    setActiveSticker({ id:Date.now(),url: sticker, x: 50, y: 50, size: 100 });
    setIsStickerPanelOpen(false);
  };
  const removeSticker = (stickerId) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== stickerId));
    };
  const fixSticker = () => {
    setStickers((prev) => [...prev, activeSticker]);
    setActiveSticker(null);
  };

  const handleStickerMove = (e) => {
    const { clientX, clientY } = e;
    if (activeSticker) {
      setActiveSticker((prev) => ({
        ...prev,
        x: clientX - 50,
        y: clientY - 50,
      }));
    }
  };

  return (
    <div className="photo-frame" onMouseMove={handleStickerMove}>
      <div
        className="blur-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: `blur(20px) brightness(${adjustments.brightness}%) saturate(${adjustments.saturation}%) contrast(${adjustments.contrast}%)`,
        }}
      ></div>
      <div
        className="shadows"
      >
      
      </div>
      {adornEffect && (
          <div
            className="effectBackground"
            style={{
              backgroundImage: `url(/gifs-background/${adornEffect}.gif)`,
            }}
          ></div>
        )}
      <div
        className="photo-content"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: `brightness(${adjustments.brightness}%) saturate(${adjustments.saturation}%) contrast(${adjustments.contrast}%)`,
        }}
      ></div>
    <div className="info-container">
        <div className="time">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="weather">
        <div className="temperature">{weather.temperature}</div>
        <div className="description">{weather.description}</div>
        <IconSun className="sun"></IconSun>
        </div>
    </div>
    <div className="containerButtons">
        <IconChange className="menu-button" onClick={() => setIsModalOpen(true)}/>
        <IconEdit className="menu-button" onClick={() => setIsEditPanelOpen(!isEditPanelOpen)}/>
        <IconEffect className="menu-button" onClick={toggleAdorns}/>
        <IconSticker className="menu-button" onClick={() => setIsStickerPanelOpen(true)}/>
    </div>
    
    

    {isEditPanelOpen && (
        <div className="edit-panel">
        <h4>Editar Imagen</h4>
        <label>
            Brillo:
            <input
            type="range"
            name="brightness"
            min="50"
            max="200"
            value={adjustments.brightness}
            onChange={handleAdjustmentChange}
            />
        </label>
        <label>
            Saturación:
            <input
            type="range"
            name="saturation"
            min="50"
            max="200"
            value={adjustments.saturation}
            onChange={handleAdjustmentChange}
            />
        </label>
        <label>
            Contraste:
            <input
            type="range"
            name="contrast"
            min="50"
            max="200"
            value={adjustments.contrast}
            onChange={handleAdjustmentChange}
            />
        </label>
        </div>
    )}
    
    {stickers.map((sticker) => (
        <img
        key={sticker.id}
        src={sticker.url}
        alt="Sticker"
        className="sticker"
        style={{
            top: `${sticker.y}px`,
            left: `${sticker.x}px`,
            width : '100px',
            height : '100px'     
        }}
        onClick={()=>{removeSticker(sticker.id);setActiveSticker({ id:sticker.id,url: sticker.url, x: sticker.x, y: sticker.y, size: 100 })}}
        />
    ))}
    {activeSticker && (
        <div
        className="active-sticker"
        style={{
            top: `${activeSticker.y}px`,
            left: `${activeSticker.x}px`,
            width : '100px',
            height : '100px'    
        }}
        onClick={fixSticker}
        >
        <img src={activeSticker.url} alt="Active Sticker"
        style={{
            width : '100px',
                height : '100px'    
            }} />
        
        </div>
    )}
    
    {isModalOpen && (
    <div className="modal">
        <div className="modal-content">
        <h2>Seleccionar Imagen</h2>
        <div className="image-gallery">
            {images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                onClick={() => handleImageSelect(image)}
                className="gallery-image"
            />
            ))}
        </div>
        <button
            className="close-modal"
            onClick={() => setIsModalOpen(false)}
        >
            Cerrar
        </button>
        </div>
    </div>
    )}
    {isStickerPanelOpen && (
    <div className="modal">
        <div className="modal-content">
        <h2>Seleccionar Sticker</h2>
        <div className="image-gallery">
            {stickerOptions.map((sticker, index) => (
            <img
                key={index}
                src={sticker}
                alt={`Sticker ${index + 1}`}
                onClick={() => handleStickerSelect(sticker)}
                className="gallery-image"
            />
            ))}
        </div>
        <button
            className="close-modal"
            onClick={() => setIsStickerPanelOpen(false)}
        >
            Cerrar
        </button>
        </div>
    </div>
      )}
    </div>
  );
};

export default PhotoFrame;
