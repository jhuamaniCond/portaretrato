import React, { useState, useEffect,useRef  } from "react";
import "./PhotoFrame.css";
import { ReactComponent as IconChange } from '../icons/change.svg';
import { ReactComponent as IconEdit } from '../icons/edit.svg';
import { ReactComponent as IconEffect } from '../icons/effects.svg';
import { ReactComponent as IconSticker } from '../icons/sticker.svg';
import { ReactComponent as IconSun } from '../icons/sun.svg';
import { ReactComponent as IconPlay } from '../icons/play.svg';
import { ReactComponent as IconStop } from '../icons/stop.svg';
import { ReactComponent as IconReset } from '../icons/reset.svg';

const PhotoFrame = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: "25°C",
    description: "Soleado",
  });
  const [backgroundImage, setBackgroundImage] = useState(
    `${process.env.PUBLIC_URL}/photos/photo1.jpg`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [adornEffect, setAdornEffect] = useState("");
  const [isStickerPanelOpen, setIsStickerPanelOpen] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);
  const [isPlaying,setIsPlaying]=useState(false);
  const [images, setImages] = useState([
    `${process.env.PUBLIC_URL}/photos/photo1.jpg?text=Image+1`,
    `${process.env.PUBLIC_URL}/photos/photo2.jpg?text=Image+2`,
    `${process.env.PUBLIC_URL}/photos/photo3.jpg?text=Image+3`,
    `${process.env.PUBLIC_URL}/photos/photo4.jpg?text=Image+4`,
    `${process.env.PUBLIC_URL}/photos/photo5.jpg?text=Image+5`,
    `${process.env.PUBLIC_URL}/photos/photo6.jpg?text=Image+6`,
    `${process.env.PUBLIC_URL}/photos/photo7.jpg?text=Image+7`,
    `${process.env.PUBLIC_URL}/photos/photo8.jpg?text=Image+8`,
    `${process.env.PUBLIC_URL}/photos/photo9.jpg?text=Image+9`,
    `${process.env.PUBLIC_URL}/photos/photo10.jpg?text=Image+10`,
    `${process.env.PUBLIC_URL}/photos/photo11.jpg?text=Image+11`,
    `${process.env.PUBLIC_URL}/photos/photo12.jpg?text=Image+12`,
    `${process.env.PUBLIC_URL}/photos/photo13.webp?text=Image+13`,
    `${process.env.PUBLIC_URL}/photos/photo14.jpg?text=Image+14`,
    `${process.env.PUBLIC_URL}/photos/photo15.jpg?text=Image+15`,
    `${process.env.PUBLIC_URL}/photos/photo16.jpg?text=Image+16`,
    `${process.env.PUBLIC_URL}/photos/photo17.jpg?text=Image+17`,
  ])
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    saturation: 100,
    contrast: 100,
  });
  const intervalRef = useRef(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stickerOptions = [
    `${process.env.PUBLIC_URL}/stickers/s1.gif`,
    `${process.env.PUBLIC_URL}/stickers/s2.gif`,
    `${process.env.PUBLIC_URL}/stickers/s3.gif`,
    `${process.env.PUBLIC_URL}/stickers/s4.gif`,
    `${process.env.PUBLIC_URL}/stickers/s5.gif`,
    `${process.env.PUBLIC_URL}/stickers/s6.gif`,
    `${process.env.PUBLIC_URL}/stickers/s7.gif`,
    `${process.env.PUBLIC_URL}/stickers/s8.gif`,
    `${process.env.PUBLIC_URL}/stickers/s9.gif`,
    `${process.env.PUBLIC_URL}/stickers/s10.gif`,
    `${process.env.PUBLIC_URL}/stickers/s11.gif`,
    `${process.env.PUBLIC_URL}/stickers/s12.gif`,
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
  const playImages = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      let currentIndex = images.indexOf(backgroundImage);

      intervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Ciclo infinito de imágenes
        setBackgroundImage(images[currentIndex]);
      }, 2000); // Cambia cada 2 segundos
    }
  };
  const stopPlayImages = () => {
    if (isPlaying) {
      setIsPlaying(false);
      clearInterval(intervalRef.current); // Limpia el intervalo
    }
  };

  const resetParameters =()=>{
    setAdornEffect("")
    setStickers([])
    setAdjustments({
        brightness: 100,
        saturation: 100,
        contrast: 100,
      })
  }
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages([...images, e.target.result]); // Añade la imagen al array
      };
      reader.readAsDataURL(file); // Convierte el archivo en una URL base64
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
              backgroundImage: `url(${process.env.PUBLIC_URL}/gifs-background/${adornEffect}.gif)`,
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
      <img src={`${process.env.PUBLIC_URL}/logo.png`}  className="logo"/>
      
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
        <IconReset className="menu-button" onClick={resetParameters}/>
        {isPlaying ? <IconStop className="menu-button" onClick={stopPlayImages}></IconStop> : <IconPlay className="menu-button" onClick={playImages}></IconPlay>}
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
        {/* Subir nueva imagen desde el dispositivo */}
        <div className="add-image">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
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
