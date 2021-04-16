import React, { Component } from 'react';
import axios from "axios";
import{} from 'semantic-ui-react';
import {CurrentWeather } from './CurrentWeather'


class CurrentWeatherCard extends Component {
  
  state = {
    geolocation: {},
    location: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const openCageKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
      const openWeatherMapKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

      let { latitude, longitude } = position.coords;
      let locationResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`
      );
      let weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapKey}&units=metric`
      );
      let weatherInfo = {
        town: locationResponse.data.results[0].components.town,
        temp: weatherResponse.data.current.temp,
        sunrise: weatherResponse.data.current.sunrise,
        sunset: weatherResponse.data.current.sunset,
        country: locationResponse.data.results[0].components.country,
      };

       this.setState({ location: weatherInfo });
    });
  }

  render() {
    
    return (
      <div data-cy="weather-display">
        <h2 data-cy="temp">{this.state.location.temp}°C</h2>
        <h2 data-cy="location">{this.state.location.town}</h2>
        <h2 data-cy="country">{this.state.location.country}</h2>
        <h2 data-cy="sunrise">
          {new Date(this.state.location.sunrise * 1000).getHours()}:
          {new Date(this.state.location.sunrise * 1000).getMinutes()}am
        </h2>
        <h2 data-cy="sunset">
          {new Date(this.state.location.sunset * 1000).getHours()}:
          {new Date(this.state.location.sunset * 1000).getMinutes()}pm
        </h2>
      </div>
    )
  }
}

export default CurrentWeatherCard;
