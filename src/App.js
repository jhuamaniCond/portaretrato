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


  return (
    <PhotoFrame></PhotoFrame>
  );
}

export default App;
