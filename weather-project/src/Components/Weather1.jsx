import React, { useState, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './weather.css';

const API_KEY = 'Ei4NRNQOjUR6YNKtx0ob6gEZJnLiuxys';

const Weather1 = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error message
  const locationRef = useRef(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${locationRef.current.value}&apikey=${API_KEY}`);
      const responseData = await response.json();
      console.log(responseData);
      const { location, timelines } = responseData;
      const { daily } = timelines;
      console.log(location);
      console.log(daily);
      setWeatherData(location);
      setData(daily);
      setLoading(false);
      setError(null); // Clear error if fetch is successful
      // setError('Error fetching weather data. Please try again.');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
      setError('Error fetching weather data. Please try with correct data again.'); // Set error message
    }
  }

  const handleCloseSnackbar = () => {
    setError(null); // Clear error message when Snackbar is closed
  };

  return (
    <div className="weather-container">
      <h1 style={{color: "black"}}>Current Weather</h1>
      <div className="input-container">
        <input type="text" ref={locationRef} placeholder="Enter location"/>
        <hr></hr>
        <button onClick={fetchData}>Submit</button>
      </div>
      
      {/* Snackbar for displaying error message */}
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
      
      {/* Conditional rendering based on loading state */}
      {loading ? (
        <h2 style={{color: "black"}}><i>Loading...</i></h2>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weatherData.lat}</td>
                <td>{weatherData.lon}</td>
                <td>{weatherData.name}</td>
              </tr>
            </tbody>
          </table>
          <hr></hr>
          <h2 style={{color: "black"}}>Temperature</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Average Temperature (°C)</th>
                <th>Max Temperature (°C)</th>
                <th>Min Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.time}</td>
                  <td>{entry.values.temperatureAvg}</td>
                  <td>{entry.values.temperatureMax}</td>
                  <td>{entry.values.temperatureMin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Weather1;
