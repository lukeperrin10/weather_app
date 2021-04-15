import React, { Component } from 'react'

class App extends Component {
  state={
    geolocation:{}
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position =>{
      this.setState({geolocation:position.coords})
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