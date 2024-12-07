import React, { useState } from 'react';
import './App.css';
import PhotoFrame from './components/PhotoFrame';

function App() {
  const initialPhotos = [
    { id: 1, url: '/photos/photo1.jpg', title: 'Photo 1' },
    { id: 2, url: '/photos/photo2.jpg', title: 'Photo 2' },
    { id: 3, url: '/photos/photo3.jpg', title: 'Photo 3' },
    { id: 4, url: '/photos/photo4.jpg', title: 'Photo 4' },
    { id: 5, url: '/photos/photo5.jpg', title: 'Photo 5' },
    { id: 6, url: '/photos/photo6.jpg', title: 'Photo 6' },
    { id: 7, url: '/photos/photo7.jpg', title: 'Photo 7' },
    { id: 8, url: '/photos/photo8.jpg', title: 'Photo 8' },
    { id: 9, url: '/photos/photo9.jpg', title: 'Photo 9' },
    { id: 10, url: '/photos/photo10.jpg', title: 'Photo 10' },
    { id: 11, url: '/photos/photo11.jpg', title: 'Photo 11' },
  ];

  const [photos, setPhotos] = useState(initialPhotos);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos([...photos, { id: photos.length + 1, url: reader.result, title: `Photo ${photos.length + 1}` }]);
        setCurrentPhotoIndex(photos.length); // Cambia a la nueva foto subida
      };
      reader.readAsDataURL(file);
    }
  };

  const imageStyles = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  return (
    <PhotoFrame></PhotoFrame>
  );
}

export default App;
