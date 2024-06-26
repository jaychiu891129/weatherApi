import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    const apiKey = "a5ede428bce49cbe3e0429e9b3629f5b"; // 使用你的OpenWeather API密鑰
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError("");
    } catch (error) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>查詢天氣網頁</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="輸入城市名稱 Ex.Taipei..."
      />
      <button onClick={getWeather}>取得天氣資訊</button>
      {error && <p>{error}</p>}
      {weather && (
        <div id="weather">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>{weather.weather[0].description}</p>
          <p>溫度: {weather.main.temp}°C</p>
          <p>濕度: {weather.main.humidity}%</p>
          <p>風速: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
