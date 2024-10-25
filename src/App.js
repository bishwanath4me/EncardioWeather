import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar";
import WeatherCard from "../src/components/WeatherCard";
import axios from "axios";
import TodayData from "./components/TodayData";
import FiveDayForecast from "./components/Fiveday";
import { grey } from "@mui/material/colors";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    WeatherData(city);
  }, [city]);
  const AirQualityData = (lat, lon) => {
    const API_KEY = "1f5a2fa85d07783032272b2c7e91acef"; // Replace with your OpenWeatherMap API key
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]); // Set the first item in the list as air quality data
      })
      .catch((error) =>
        console.error("Error fetching the air quality data:", error)
      );
  };

  const WeatherData = async () => {
    const API_KEY = "1f5a2fa85d07783032272b2c7e91acef";
   await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log(JSON.stringify(data));
        AirQualityData(data.coord.lat, data.coord.lon);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then((response) => {
            setFiveDayForecast(response.data);
          })
          .catch((error) =>
            console.error("Error fetching the 5-day forecast data:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching the weather data:", error)
      );
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData && (
        <div className="weathercontainer" style={{backgroundColor:"#90a8ce"}}>
          <div className="cardContainer">
            <WeatherCard weatherData={weatherData} />
             <p
              style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}
            >
              5 Days Forecast
            </p> 
             {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast} />
            )}
          </div>
          <div className="todayRoot">
            <TodayData
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
