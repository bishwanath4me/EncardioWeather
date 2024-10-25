import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit'; 
import CloudIcon from '@mui/icons-material/Cloud'; 


const WeatherCard = ({ weatherData }) => {

  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

    const renderTemperatureIcon = () => {
      if (temperatureCelsius > 23) {
        return <WbSunnyIcon className='cardIcon' style={{ color:'orange'  }} />;
      } else if (temperatureCelsius < 10) {
        return <AcUnitIcon className='cardIcon' style={{ color: 'blue' }} />;
      } else {
        return <CloudIcon className='cardIcon' style={{color: 'gray' }} />;
      }
    };

    return (
      <div className='weatherCard'>
      <div style={{margin:"10px 10px 5px 40px"}}>
        <div style={{fontSize:'20px'}}>Now</div>
      <div className='temprature'>
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
        
        </div>
      <div className='wetDescription'>  {weatherDescription}</div>
      <div style={{ marginTop: '1rem' }}>
      <div className='monthIcon'>
       <CalendarMonthIcon/> 
        {currentDate}</div>
      <div className='locationIcon'>
      <LocationOnIcon/>
        {cityName}, {countryName}</div>
      </div>
      </div>
      </div>
    );
  };
  
  export default WeatherCard;
  