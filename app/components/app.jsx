import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import List from './List';

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
  }

  componentDidMount() {
    this.fetchObservations('');
  }

  createObservationsList(results) {
    const observations = [];

    results.forEach((result) => {
      observations.push({
        id: result.uuid,
        date: result.observed_on,
        photos: result.photos,
        sounds: result.sounds,
        taxonName: result.taxon ? result.taxon.name : null,
        uri: result.uri,
        userName: result.user.login,
      });
    });

    return observations;
  }

  fetchObservations(additionalParams) {
    const url = 'https://api.inaturalist.org/v1/observations';
    const params = '?order=desc&order_by=created_at&per_page=100&sounds=true';
    axios.get(url + params + additionalParams)
      .then((response) => {
        const { results } = response.data;
        const observations = this.createObservationsList(results);

        this.setState({
          observations,
          loading: false,
        });
        console.log(this.state.observations, 'results');
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  fetchObservationsWithNewParams(params) {
    this.setState({
      loading: true,
    });

    this.fetchObservations(params);
  }

  showNativeSpecies() {
    const params = '&native=true';
    this.fetchObservationsWithNewParams(params);
  }

  showNearby(latitude, longitude) {
    const params = `&lat=${latitude}&lng=${longitude}&radius=${100}`;
    this.fetchObservationsWithNewParams(params);
  }

  showPopular() {
    const params = '&popular=true';
    this.fetchObservationsWithNewParams(params);
  }

  showResearchQuality() {
    const params = '&quality_grade=research';
    this.fetchObservationsWithNewParams(params);
  }

  showThreatened() {
    const params = '&threatened=true';
    this.fetchObservationsWithNewParams(params);
  }

  getUserGeolocation() {
    if (window.navigator.geolocation) {
      const success = (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;
        console.log(latitude, longitude);
        this.showNearby(latitude, longitude);
      };
      const failure = (message) => {
        alert('Cannot retrieve your location');
      };
      navigator.geolocation.getCurrentPosition(success, failure, {
        maximumAge: Infinity,
        timeout: 5000
      });
    }
  }

  addParameters() {
    const {
      value,
    } = this.state;

    if (value === 'native') {
      this.showNativeSpecies();
    }
    if (value === 'popular') {
      this.showPopular();
    }
    if (value === 'quality') {
      this.showResearchQuality();
    }
    if (value === 'threatened') {
      this.showThreatened();
    }
    if (value === 'location') {
      this.getUserGeolocation();
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value.toLowerCase(),
    }, () => this.addParameters());
  }

  playSound(e) {
    const {
      observations,
    } = this.state;

    const audioID = e.target.value;
    let audioURL = '';

    for (let i = 0; i < observations.length; i++) {
      if (observations[i].id === audioID) {
        audioURL = observations[i].sounds[0].file_url;
      }
    }
    const audio = new Audio(audioURL);
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 4000);
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
          value={value}
        />
        <List
          value={value}
          loading={loading}
          observations={observations}
          onClick={this.playSound}
        />
      </div>
    );
  }
}

export default App;
