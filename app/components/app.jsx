import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    this.fetchObservations();
  }

  fetchObservations() {
    const url = 'https://api.inaturalist.org/v1/observations';
    const params = '?order=desc&order_by=created_at&sounds=true&per_page=100'
    axios.get(url + params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  playSound() {
    const audio = new Audio('https://static.inaturalist.org/sounds/25393.x-m4a?1535421964');
    audio.loop = true;
    audio.play();
  }

  render() {
    return (
      <div>
        <button onClick={this.playSound}>Play sound</button>
      </div>
    );
  }
}

export default App;
