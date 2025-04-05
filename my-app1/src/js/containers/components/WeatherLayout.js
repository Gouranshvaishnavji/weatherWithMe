import React, { useState, useEffect } from 'react';
import WeatherWidget from './weatherWidget';
import './WeatherLayout.css';

const WeatherLayout = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [season, setSeason] = useState('summer');
  const [particles, setParticles] = useState([]);

  // Update season based on weather data
  useEffect(() => {
    if (weatherData) {
      const temp = weatherData.main.temp;
      if (temp > 25) setSeason('summer');
      else if (temp > 15) setSeason('cloudy');
      else if (temp > 5) setSeason('rainy');
      else setSeason('snowy');
    }
  }, [weatherData]);

  // Generate particles based on season
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const count = season === 'summer' ? 20 : 
                   season === 'rainy' ? 50 :
                   season === 'snowy' ? 30 : 15;

      for (let i = 0; i < count; i++) {
        const particle = {
          id: i,
          type: season,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`
          }
        };
        newParticles.push(particle);
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 5000);
    return () => clearInterval(interval);
  }, [season]);

  // Handle weather data updates
  const handleWeatherUpdate = (data) => {
    setWeatherData(data);
  };

  // Render character based on season
  const renderCharacter = (position) => {
    const characterClass = `${season}-character ${position}-character`;
    return (
      <div className={`character-container ${characterClass}`}>
        <div className="character">
          <div className="character-body">
            <div className="character-head">
              <div className="character-face">
                <div className="character-eyes">
                  <div className="character-eye"></div>
                  <div className="character-eye"></div>
                </div>
                <div className="character-mouth"></div>
              </div>
            </div>
            <div className="character-torso"></div>
            <div className="character-arm left-arm"></div>
            <div className="character-arm right-arm"></div>
            <div className="character-legs">
              <div className="character-leg left-leg"></div>
              <div className="character-leg right-leg"></div>
            </div>
            {season === 'summer' && <div className="character-accessory sun-umbrella"></div>}
            {season === 'rainy' && (
              <>
                <div className="character-accessory rain-umbrella"></div>
                <div className="character-accessory rain-ripples"></div>
              </>
            )}
            {(season === 'snowy' || season === 'cloudy') && (
              <>
                <div className="character-accessory winter-coat"></div>
                <div className="character-accessory breath-fog"></div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render particles based on season
  const renderParticles = () => {
    return particles.map(particle => {
      const particleClass = `${particle.type}-particle`;
      return (
        <div
          key={particle.id}
          className={particleClass}
          style={particle.style}
        />
      );
    });
  };

  return (
    <div className={`weather-app ${season}`}>
      <nav className="weather-navbar">
        <h1 className="navbar-title">Weather App</h1>
        <button className="blogs-button">Blogs</button>
      </nav>
      <div className="weather-content">
        {renderCharacter('left')}
        <div className="weather-widget-container">
          <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />
        </div>
        {renderCharacter('right')}
      </div>
      <div className="particles-container">
        {renderParticles()}
      </div>
    </div>
  );
};

export default WeatherLayout; 