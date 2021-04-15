import axios from 'axios'
import React, { Component } from 'react'


class App extends Component {
  state = {
    geolocation: {}
  }




  componentDidMount() {


    navigator.geolocation.getCurrentPosition(async position => {
      const openCageKey = process.env.REACT_APP_OPEN_CAGE_API_KEY
      const openWeatherMapKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY

      let { latitude, longitude } = position.coords
      let locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${latitude}%${longitude}&pretty=1&no_annotations=1`)
      let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapKey}&units=metric`)
      debugger
    })
  }
  render() {
    return (
      <div>
        Hello world
      </div>
    )
  }
}

export default App