import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Welcome to Know Your City',
      subtitle: 'Discover the world\'s most amazing destinations',
      description: 'Your ultimate guide to exploring cities, finding hidden gems, and creating unforgettable travel experiences.'
    },
    {
      id: 2,
      type: 'video',
      src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=165&oauth2_token_id=57447761',
      title: 'Urban Adventures Await',
      subtitle: 'Experience the pulse of vibrant cities',
      description: 'Walk through bustling streets, discover hidden alleys, and feel the energy of urban life.'
    },
    {
      id: 3,
      type: 'video',
      src: 'https://player.vimeo.com/external/291648067.sd.mp4?s=7f4aa3f8bd3ae457f1e4a189a19a09b564cc5f1b&profile_id=164&oauth2_token_id=57447761',
      title: 'Night City Lights',
      subtitle: 'Explore cities after dark',
      description: 'Witness the transformation of cities as they light up with neon signs and urban energy.'
    },
    {
      id: 4,
      type: 'video',
      src: 'https://player.vimeo.com/external/320351179.sd.mp4?s=8b9a4b8c8b9a4b8c8b9a4b8c8b9a4b8c8b9a4b8c&profile_id=164&oauth2_token_id=57447761',
      title: 'Cultural Experiences',
      subtitle: 'Immerse yourself in local culture',
      description: 'From street food to historic landmarks, experience the authentic soul of every city.'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Find Hidden Gems',
      subtitle: 'Uncover local favorites and secret spots',
      description: 'Discover restaurants, attractions, and places that locals love.'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-3xl mb-4 text-gray-200 animate-fade-in-delay font-medium">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto animate-fade-in-delay-2 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-3">
                  <Link
                    to="/cities"
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>Explore Cities</span>
                  </Link>
                  <Link
                    to="/places"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10 hover:bg-white flex items-center space-x-2"
                  >
                    <span>Browse Places</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: isPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : '0%'
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
