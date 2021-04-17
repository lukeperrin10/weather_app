import React, { Component } from "react";
import axios from "axios";
import { Divider, Grid, Header, Segment } from "semantic-ui-react";
import Moment from "react-moment";
import 'moment-timezone'
//import Weatherforecast from "./WeatherForecast";

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
    const sunrise = this.state.location.sunrise;
    const sunset = this.state.location.sunset;

    return (
      <Segment placeholder>
        <Grid columns={2} stackable>
          <Divider vertical></Divider>
          <Grid.Row verticalAlign="middle">
            <Grid.Column data-cy="weather-display">
              <Header>Local Weather</Header>

              <p data-cy="temp">{this.state.location.temp}°C </p>
              <p data-cy="location">{this.state.location.town}</p>
              <p data-cy="country">{this.state.location.country}</p>
              <p>Sunrise {" "}
                <Moment data-cy="sunrise" unix format="HH:mm">{sunrise}</Moment>
              </p>
              
              <p>Sunset{" "}
                <Moment data-cy="sunset" unix format="HH:mm">{sunset}</Moment>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default CurrentWeatherCard;
