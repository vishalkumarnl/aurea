import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ images, interval = 2000 }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  // Autoplay effect
  useEffect(() => {
    const startAutoPlay = () => {
      timeoutRef.current = setTimeout(nextSlide, interval);
    };
    startAutoPlay();

    return () => clearTimeout(timeoutRef.current);
  }, [current, interval]);

  // Swipe gesture support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) nextSlide(); // swipe left
    if (swipeDistance < -minSwipeDistance) prevSlide(); // swipe right
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(nextSlide, interval);
  };

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className="left-arrow" onClick={prevSlide}>❮</button>
      <button className="right-arrow" onClick={nextSlide}>❯</button>

      {images.map((img, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && <img src={img} alt={`slide ${index}`} className="image" />}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
