import React, { useEffect, useState, useRef } from "react";
import "./WeatherWidget.css";

const WeatherWidget = ({ onWeatherUpdate }) => {
  const [location, setLocation] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherEffect, setWeatherEffect] = useState(null);
  
  const rainEffectRef = useRef(null);
  const snowEffectRef = useRef(null);
  const sunEffectRef = useRef(null);
  const thunderEffectRef = useRef(null);
  const cloudEffectRef = useRef(null);

  const API_KEY = "68f0e59acfce30ebbbb4885d38342493";

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error(data.message || "Failed to fetch weather");
      }
      setWeatherData(data);
      
      // Set weather effect based on condition
      const weatherCondition = data.weather[0].main;
      setWeatherEffect(weatherCondition);
      
      // Notify parent component of weather update
      onWeatherUpdate(data);
      
      // Create weather effects
      createWeatherEffects(weatherCondition);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  
  // Function to create weather effects
  const createWeatherEffects = (condition) => {
    // Clear previous effects
    if (rainEffectRef.current) {
      rainEffectRef.current.innerHTML = '';
      rainEffectRef.current.style.opacity = '0';
    }
    if (snowEffectRef.current) {
      snowEffectRef.current.innerHTML = '';
      snowEffectRef.current.style.opacity = '0';
    }
    if (sunEffectRef.current) {
      sunEffectRef.current.style.opacity = '0';
    }
    if (thunderEffectRef.current) {
      thunderEffectRef.current.style.opacity = '0';
    }
    if (cloudEffectRef.current) {
      cloudEffectRef.current.innerHTML = '';
      cloudEffectRef.current.style.opacity = '0';
    }
    
    // Create new effects based on weather condition
    switch(condition) {
      case 'Clear':
        if (sunEffectRef.current) {
          sunEffectRef.current.style.opacity = '1';
        }
        break;
      case 'Rain':
      case 'Drizzle':
        if (rainEffectRef.current) {
          rainEffectRef.current.style.opacity = '1';
          // Create 50 raindrops
          for (let i = 0; i < 50; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = `${Math.random() * 100}%`;
            raindrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            raindrop.style.animationDelay = `${Math.random() * 2}s`;
            rainEffectRef.current.appendChild(raindrop);
          }
        }
        break;
      case 'Snow':
        if (snowEffectRef.current) {
          snowEffectRef.current.style.opacity = '1';
          // Create 30 snowflakes
          for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.animationDuration = `${3 + Math.random() * 5}s`;
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            snowEffectRef.current.appendChild(snowflake);
          }
        }
        break;
      case 'Thunderstorm':
        if (thunderEffectRef.current) {
          thunderEffectRef.current.style.opacity = '1';
          // Create thunder effect
          const thunder = document.createElement('div');
          thunder.className = 'thunder';
          thunderEffectRef.current.appendChild(thunder);
        }
        break;
      case 'Clouds':
        if (cloudEffectRef.current) {
          cloudEffectRef.current.style.opacity = '1';
          // Create 3 clouds
          for (let i = 1; i <= 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = `cloud cloud-${i}`;
            cloudEffectRef.current.appendChild(cloud);
          }
        }
        break;
      default:
        // For other conditions, no special effect
        break;
    }
  };

  return (
    <div className="weather-widget" data-weather={weatherEffect}>
      <h2>Weather Widget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p>
            Temperature: <span className="temperature-value">{weatherData.main?.temp}°C</span>
          </p>
          <p>
            Min: <span className="temperature-value">{weatherData.main?.temp_min}°C</span> / 
            Max: <span className="temperature-value">{weatherData.main?.temp_max}°C</span>
          </p>
          <p>Condition: {weatherData.weather?.[0]?.main}</p>
          <p>Description: {weatherData.weather?.[0]?.description}</p>
        </div>
      )}
      
      {/* Weather Effects */}
      <div className="rain-effect" ref={rainEffectRef}></div>
      <div className="snow-effect" ref={snowEffectRef}></div>
      <div className="sun-effect" ref={sunEffectRef}></div>
      <div className="thunder-effect" ref={thunderEffectRef}></div>
      <div className="cloud-effect" ref={cloudEffectRef}></div>
    </div>
  );
};

export default WeatherWidget;
