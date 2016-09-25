import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {
  countryFromLatLong,
  closestJourneySection,
  nextJourneySection,
  calculateRemainingDistance,
  pathsLength,
} from './utils';

import {DistanceDone} from './distance-done';
import {CheckinLocation} from './checkin-location';
import {DistanceRemaining} from './distance-remaining';
import {FunFact} from './fun-fact';
import {ProgressBar} from './progress-bar';
import {GoogleMap} from './google-map';
import {PhotoUpdate} from './photo-update';

export const App = React.createClass({
  componentDidMount: function() {
    var latestCheckin = this.props.data.latestCheckin;

    countryFromLatLong(latestCheckin.latitude, latestCheckin.longitude)
      .then((country) => this.setState({ country }));
  },

  getInitialState: function() {
    const lat = parseFloat(this.props.data.latestCheckin.latitude);
    const lng = parseFloat(this.props.data.latestCheckin.longitude);
    const allJourneySections = this.props.data.plannedPaths;

    const currentJourneySection = closestJourneySection(allJourneySections, lat, lng);
    const nxtJourneySection = nextJourneySection(currentJourneySection, allJourneySections);


    // Paths, converted into google lat lng objects
    const convertedPaths = this.props.data.paths.map((path) => {
      return path.map((e) => new google.maps.LatLng({lat: e.lat, lng: e.lng}));
    });

    const distanceTravelled = pathsLength(convertedPaths);
    const distanceRemaining = calculateRemainingDistance(allJourneySections, lat, lng);

    // There isn't a "total distance" measure, so let's just use distance
    // travelled + estimated distance to go!
    const distanceTotal = distanceTravelled + distanceRemaining;

    const mostRecentPhotoData = this.props.data.photos[this.props.data.photos.length-1];

    return {
      ...this.props.data,

      distanceTravelled,
      distanceRemaining,
      distanceTotal,

      photos: this.props.data.photos,
      paths: convertedPaths,
      currentLat: lat,
      currentLng: lng,
      country: null,
      nextJourneySection: nxtJourneySection,
      photoData: mostRecentPhotoData,
    };
  },

  render: function() {
    return (
      <div className="container">
        <div className="stats">
          <DistanceDone distance={this.state.distanceTravelled} daysOnTheRoad={this.state.daysOnTheRoad} />
          <CheckinLocation country={this.state.country} time={moment(this.state.latestCheckin.sent_at)} />
          <DistanceRemaining distance={this.state.distanceRemaining} nextSection={this.state.nextJourneySection.name} />
        </div>
        <FunFact distance={this.state.distanceTravelled} daysOnTheRoad={this.state.daysOnTheRoad} />
        <ProgressBar distanceTravelled={this.state.distanceTravelled} distanceTotal={this.state.distanceTotal} />
        <GoogleMap
          google={this.state.google}
          paths={this.state.paths}
          photos={this.state.photos}
          photoHandler={(photoData) => this.setState({photoData: photoData})}
          lat={this.state.currentLat}
          lng={this.state.currentLng}
          zoom={8}/>
        <PhotoUpdate data={this.state.photoData}/>
      </div>
    )
  }
});
