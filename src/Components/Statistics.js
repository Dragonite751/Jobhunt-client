import React, { useState } from 'react';

const PlacementStatistics = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to manage active slide index

  // Data for carousel items
  const carouselItems = [
    'https://nitw.ac.in/media/files/placement-slideshow-1.jpg',
    'https://nitw.ac.in/media/files/placement-slideshow-3.jpg',
    'https://nitw.ac.in/media/files/placement-slideshow-2.jpg',
  ];

  // Function to handle slide change
  const handleSlideChange = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="text-white px-4 py-8">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8">Placement Statistics</h3>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {carouselItems.map((item, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === activeIndex ? 'active' : ''}
                aria-current={index === activeIndex ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                onClick={() => handleSlideChange(index)}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {carouselItems.map((item, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <img src={item} className="d-block w-100 rounded-lg" alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
            onClick={() => handleSlideChange(activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1)}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
            onClick={() => handleSlideChange(activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1)}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementStatistics;
