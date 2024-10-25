import React, { useState } from "react";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "./Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const TodayData = ({ weatherData, airQualityData }) => {
  const { main, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi; // Accessing aqi from airQualityData.main
  const { co, no, no2, o3 } = airQualityData?.components || {};
  
  // State to track temperature unit
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to toggle between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Convert Celsius to Fahrenheit
  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9/5) + 32;
  };

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { 
      title: "Feels Like", 
      value: `${convertTemperature(main.feels_like).toFixed(1)}°${isCelsius ? 'C' : 'F'}`, 
      Icon: DeviceThermostatIcon 
    },
  ];

  return (
    <div
    className="todayData" 
    >
      <div className="todayHighlight">Today's Highlights</div>
      <div className="highlightContainer">
        <div className="airHumidity">
          <div>
            <div className="airHead">
              <p>Air Quality Index</p>
              <div
              className="airQuality">
                {renderAirQualityDescription(airQualityIndex)}
              </div>
            </div>
            <div>
              <AirIcon className="airIcon"/>
              <div className="unit">
                <div>
                  <p style={{ fontWeight: "bold" }}>CO</p>
                  <p>{co} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>NO</p>
                  <p>{no} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>NO₂</p>
                  <p>{no2} µg/m³</p>
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>O₃</p>
                  <p>{o3} µg/m³</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sun">
          <div className="sunText">
            <p>Sunrise And Sunset</p>
            <div className="sunData">
              <div>
                <WbSunnyIcon className="sunIcon"/>
                <p className="localTime">
                  {new Date(sys.sunrise * 1000).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <NightsStayIcon className="nightIcon"/>
                <p className="nghtText">
                  {new Date(sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="highlight">
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
{/* Toggle Button for Celsius/Fahrenheit */}
      <button
        onClick={toggleTemperatureUnit}
        className="unitConv">
         {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
};

export default TodayData;