import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      observations: [],
    };

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
        const { results } = response.data;
        const {
          observations,
        } = this.state;

        results.forEach((result) => {
          observations.push({
            photos: result.photos,
            taxonName: result.taxon ? result.taxon.name : null,
            userName: result.user.login,
            userIcon: result.user.icon,
            date: result.observed_on,
            sounds: result.sounds,
          });
        });

        this.setState({
          observations,
        });
        console.log(response.data.results);
        console.log(this.state.observations, 'observe');
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
