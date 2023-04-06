import React, { useState } from 'react'
import axios from 'axios' 
import "./WeatherPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '../../Redux/weatherSlice';

export default function WeatherPage() {
  // Define API key and state variables
  const API_KEY = "b467ded6c82c4390dbda3aa3e56e847c";
  const [temperature , setTemperature] = useState('');
  const [city , setCity] = useState('');
  const [country, setCountry] = useState('');
  const [humidity , setHumidity] = useState('');
  const [description , setDescription] = useState('');
  const [timeZone , setTimeZone] = useState('');
  const [error , setError] = useState('');
  
  // Get selected city and country from Redux store
  const city_Selected = useSelector((state) => state.weather.city);
  const country_Selected = useSelector((state) => state.weather.country);
  
  // Dispatch addDate action to Redux store with current city and country values
  const dispatch = useDispatch();
  dispatch(addDate({city , country}));
  
  // Handle changes to city and country input fields
  const handleCityChange = (e) => {
    setCity(e.target.value);
  }
  
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }
  
  // Fetch weather data from OpenWeatherMap API
  const fetch_data = async(e) => {
    const cityID = document.getElementById("city-id").value;
    const countryID = document.getElementById("country-id").value;
    
    // Check if city and country inputs are not empty
    if(cityID !== '' && countryID !== ''){
      e.preventDefault();
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city_Selected }%2C${country_Selected}&appid=${API_KEY}`);
        // Update state variables with weather data
        setTemperature(response.data.main.temp)
        setHumidity(response.data.main.humidity);
        setDescription(response.data.weather[0].description);
        setTimeZone(response.data.timezone);
        setError('');
      } catch (err) {
        // If an error occurs, reset state variables and set error message
        setTemperature('');
        setHumidity('');
        setDescription('');
        setTimeZone('');
        setError('Data Entered are not correct');
      }
    } else if (cityID !== '' && countryID === '') {
      // If country input is empty, show alert and reset city input
      alert("Country input is empty. Please fill it.");
      setCity("");
    } else if (cityID === '' && countryID !== '') {
      // If city input is empty, show alert and reset country input
      alert("City input is empty. Please fill it.");
      setCountry("");
    } else {
      // If both inputs are empty, show alert
      alert("City and country inputs are empty. Please fill them.");
    }
  }
  
  return (
    <div className='container'>
      <div className='form-input'>
        {/* Render input fields and fetch button */}
        <input className='country_input' id='country-id' type='text' placeholder='Enter your country' onChange={handleCountryChange} value={country_Selected} />
        <br></br>
        <input className='city_input' id='city-id' type='text' placeholder='Enter your city' onChange={handleCityChange} value={city_Selected} />
        <br></br>
        <button className='get_weather' onClick={fetch_data}> Fetch  </button>
        
        {/* Conditionally render weather data or error message */}
        {humidity || temperature || description || timeZone ? (
          <div className='output-container'>
            <p className='temp-value'> Temperature : {temperature}  </p>
            <p className='humidity-value'> Humidity : {humidity} </p>
            <p className='timeZone-value'> TimeZone : {timeZone}</p>
            <p className='description-value'> Description : {description }</p>
          </div>
        ) : (
          error && <p className='handle_error'>{error}</p>
        )}
      </div>
    </div>
  )
}