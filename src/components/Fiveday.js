import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  // Function to filter forecast to get one entry per day
  const getDailyForecast = (list) => {
    const dailyForecast = [];
    const seenDates = new Set();

    list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0]; // Extract only the date part (YYYY-MM-DD)
      if (!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecast.push(item); // Push only the first entry for each day
      }
    });

    return dailyForecast.slice(0, 5); // Return only 5 unique days
  };

  const dailyForecast = getDailyForecast(forecastData.list);

  return (
    <div className="fiveDayContainer">
      {dailyForecast.map((item, index) => (
        
        <div className="fiveDay"
          key={index}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {Math.round(item.main.temp)}°c
            </div>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {formatDate(item.dt_txt)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "15px" }}>
              {item.weather[0].description}
            </div>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default FiveDayForecast;
