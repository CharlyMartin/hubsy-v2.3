import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import icon from '../images/icons/marker-red.png';

import '../css/components/map.css';


class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  computeCenter(array) {
    if (array.length === 1) {
      return [array[0].lng, array[0].lat]
    }

    const lgn = array.map(obj => obj.lng).reduce((t, c) => t += c) / array.length;
    const lat = array.map(obj => obj.lat).reduce((t, c) => t += c) / array.length;
    return [lgn, lat];
  }

  createMarker(obj) {
    const el = document.createElement('div');
    el.style.backgroundImage = `url(${icon})`;
    el.className = 'marker';

    const markerHTML = `
      <div data-target=${obj.slug}>
        <h3>Hubsy ${obj.name}</h3>
        <p>${obj.street} ${obj.postcode}</p>
      </div>
    `

    const marker = new mapboxgl.Marker(el)
      .setLngLat([obj.lng, obj.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 20 }) // add popups
        .setHTML(markerHTML)
      )
    
    return marker;
  }

  initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaHVic3kiLCJhIjoiY2pwYXl1NHl3MDYxNDNxcDhkbm5qZm9ueiJ9.rTv8xFX5CHvdxHpz08id8Q';

    const center = this.computeCenter(this.props.data);

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/hubsy/cjpba7g8e1nkm2sqnagv0s2gr',
      zoom: 12,
      center: center // Paris
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();
    return map;
  }

  componentDidMount() {
    const map = this.initMap();

    this.props.data.forEach(obj => {
      this.createMarker(obj).addTo(map)
    })
  }

  render() {
    return (
      <div id="map">
        <link href='https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css' rel='stylesheet' />
      </div>
    )
  }
}
  
export default Map;
