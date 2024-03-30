import React, { useState, useRef } from 'react';
import "./weather.css";


const API_KEY = 'Ei4NRNQOjUR6YNKtx0ob6gEZJnLiuxys';

const Weather1 = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  }

  return (
    <>
    <div style={{ backgroundColor: 'lightblue',  }}>   
    <div className="Weather">
      <div>
        <h1>Current Weather</h1>
        <input
          type="text"
          ref={locationRef}
          placeholder="Enter location"
        />
        <br />
        <br />
        <button onClick={fetchData}>Submit</button>
        <br></br>
        <br></br>
        <div className="container">
          <table className="table table-bordered table-striped min-height: 400px !important">
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

          <br />
          <br />
          
          <div class="temprature-class">
            <h2>Temperature</h2>
            <table className="table table-striped">
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
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Weather1;
