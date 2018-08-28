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
      loading: false,
      value: '',
    };

    this.playSound = this.playSound.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchObservations();
  }

  createObservationsList(results) {
    const observations = [];

    results.forEach((result) => {
      observations.push({
        id: result.uuid,
        date: result.observed_on,
        photos: result.photos,
        native: result.native,
        sounds: result.sounds,
        taxonName: result.taxon ? result.taxon.name : null,
        userName: result.user.login,
      });
    });

    return observations;
  }

  fetchObservations(additionalParams) {
    const url = 'https://api.inaturalist.org/v1/observations';
    const params = '?order=desc&order_by=created_at&per_page=100';
    axios.get(url + params + additionalParams)
      .then((response) => {
        const { results } = response.data;
        const observations = this.createObservationsList(results);

        this.setState({
          observations,
          loading: false,
        });
        console.log(this.state.observations, 'observe');
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  showNativeSpecies() {
    const params = '&native=true';

    this.setState({
      loading: true,
    });
    this.fetchObservations(params);
  }

  showObservationsWithSounds() {
    const params = '&sounds=true';

    this.setState({
      loading: true,
    });

    this.fetchObservations(params);
  }

  addParameters() {
    const {
      value,
    } = this.state;
    console.log(value, 'handleSubmit');

    if (value === 'sound') {
      this.showObservationsWithSounds();
    }
    if (value === 'native') {
      this.showNativeSpecies();
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value.toLowerCase(),
    });
  }

  handleSubmit(e) {
    this.addParameters();
    e.preventDefault();
  }

  playSound() {
    const audio = new Audio('https://static.inaturalist.org/sounds/25393.x-m4a?1535421964');
    audio.loop = true;
    audio.play();
  }

  render() {
    const {
      observations,
      loading,
      value,
    } = this.state;
    return (
      <div>
        <Header
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          value={value}
        />
        <List
          loading={loading}
          observations={observations}
        />
        <PlaySounds onClick={this.playSound} />
      </div>
    );
  }
}

export default App;
