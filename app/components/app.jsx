import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import List from './List';
import PlaySounds from './PlaySounds';

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
    const params = '?order=desc&order_by=created_at&sounds=true&per_page=100';
    axios.get(url + params)
      .then((response) => {
        const { results } = response.data;
        const {
          observations,
        } = this.state;

        results.forEach((result) => {
          observations.push({
            id: result.uuid,
            date: result.observed_on,
            photos: result.photos,
            sounds: result.sounds,
            taxonName: result.taxon ? result.taxon.name : null,
            userName: result.user.login,
          });
        });

        this.setState({
          observations,
        });
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
    const {
      observations,
    } = this.state;
    return (
      <div>
        <Header />
        <List observations={observations} />
        <PlaySounds onClick={this.playSound} />
      </div>
    );
  }
}

export default App;
