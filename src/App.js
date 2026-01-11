import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=084af8cd56484d83b9945713261101&q=${city}&aqi=yes`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
    setCity("");
  };

  return (
    <div className="app">
      <h1>Weather App 🌦️</h1>

      <input
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.location.name}</h2>
          <img 
          src={weather.current.condition.icon} alt="Condition_icon" />
          <p>🌡️ {weather.current.condition.text}</p>
          <p>humidity : {weather.current.humidity}%</p>
          <p>💨 Wind: {weather.current.gust_kph} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
