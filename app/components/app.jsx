import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import List from './List';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      observations: [],
      page: 1,
      value: '',
    };

    this.fetchLastPage = this.fetchLastPage.bind(this);
    this.fetchNextPage = this.fetchNextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.playSound = this.playSound.bind(this);
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
        location: result.place_guess,
        species: result.species_guess,
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
    const params = '?order=desc&order_by=created_at&per_page=12&sounds=true';
    axios.get(url + params + additionalParams)
      .then((response) => {
        const { results } = response.data;
        const observations = this.createObservationsList(results);

        this.setState({
          loading: false,
          observations,
        });
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
    this.setState({
      loading: true,
    });

    if (window.navigator.geolocation) {
      const success = (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        this.showNearby(latitude, longitude);
      };
      const failure = (message) => {
        alert('Cannot retrieve your location');
      };
      navigator.geolocation.getCurrentPosition(success, failure, {
        maximumAge: Infinity,
        timeout: 5000,
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

  fetchNextPage() {
    let {
      page,
    } = this.state;

    page += 1;

    const params = `&page=${page}`;
    this.fetchObservationsWithNewParams(params);

    this.setState({
      page,
    });
  }

  fetchLastPage() {
    let {
      page,
    } = this.state;

    if (page > 1) {
      page -= 1;
    } else {
      page = 1;
    }

    const params = `&page=${page}`;
    this.fetchObservationsWithNewParams(params);

    this.setState({
      page,
    });
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
          lastPage={this.fetchLastPage}
          loading={loading}
          nextPage={this.fetchNextPage}
          observations={observations}
          onClick={this.playSound}
          value={value}
        />
      </div>
    );
  }
}

export default App;
