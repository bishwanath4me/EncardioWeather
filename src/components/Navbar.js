import React, { useEffect, useState } from "react";
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
//import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FmdGoodIcon from '@mui/icons-material/FmdGood';//
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");
  const [add, setAdd] = useState("");
  const [history, setHistory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
    });
    
    // Load history from localStorage on component mount
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  // Save search term to history
  const saveSearchHistory = (city) => {
    let updatedHistory = [...history];
    if (!updatedHistory.includes(city)) {
      updatedHistory = [city, ...updatedHistory].slice(0, 5); // Limit history to 5 entries
      setHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
      saveSearchHistory(searchCity);
    }
  };

  // Open/close search history menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle history item click
  const handleHistoryClick = (city) => {
    setSearchCity(city);
    onSearch(city);
    handleClose();
  };

  return (
    <nav className='navsection'>
      <div className='cloudlogo'>
        <FilterDramaIcon />
        <p className='navtext'>Today Weather</p>
      </div>
      <div className='SearchContainer' >
      <div>

        <TextField
          className='searchText'
          variant="outlined"
          placeholder="Search city"
          size='small'
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>

        <Button
          variant="contained"
          onClick={handleSearchClick}
          className="search"
        >
          Search
        </Button>
      </div>
        
        {/* Button to open search history */}
        <div>

        <Button
          variant="outlined"
          onClick={handleClick}
          className="searchHistory"
          style={{color:"black", fontWeight: "700", fontSize: "15px", backgroundColor:"#2b68bc",}}
        >
          Search History
        </Button>
        
        {/* Dropdown menu for search history */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className="menu"
        >
          {history.length === 0 ? (
            <MenuItem disabled>No Search History</MenuItem>
          ) : (
            history.map((city, index) => (
              <MenuItem key={index} onClick={() => handleHistoryClick(city)}>
                {city}
              </MenuItem>
            ))
          )}
        </Menu>
        </div>
      </div>
      <div className='currentlocation'>
        <FmdGoodIcon />
        <p className="Userlocation" >city: {add.state_district}</p>
      </div>

    </nav>
  );
};

export default Navbar;
