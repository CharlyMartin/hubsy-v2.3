import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import markerIcon from '../images/icons/marker.png';

import '../css/components/map.css';


class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  computeCenter(array) {
    if (array.length === 1) {
      return [array[0].lng, array[0].lat]
    }

    const lgn = array.map(obj => obj.lng).reduce((tot, cur) => tot += cur) / array.length;
    const lat = array.map(obj => obj.lat).reduce((tot, cur) => tot += cur) / array.length;
    return [lgn, lat];
  }

  createMarker(obj) {
    const el = document.createElement('div');
    el.style.backgroundImage = `url(${markerIcon})`;
    el.className = 'marker image-centered';

    const popupHTML = `
      <div data-target=${obj.slug}>
        <h3>Hubsy ${obj.name}</h3>
        <p>${obj.street} ${obj.postcode}</p>
      </div>
    `

    const marker = new mapboxgl.Marker(el)
      .setLngLat([obj.lng, obj.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 20 }) // add popups
        .setHTML(popupHTML)
      )
    
    return marker;
  }

  initMap() {
    const isLocal = window.location.hostname === 'localhost'
    let mapboxKey = isLocal ? process.env.MAPBOX_API_KEY : 'pk.eyJ1IjoiaHVic3kiLCJhIjoiY2pwYXl4Yjc1MmRmczNwcHhqZGE3ZDZkNSJ9.zCPsBiHOviAzl9avh6VA5g';

    mapboxgl.accessToken = mapboxKey;

    const center = this.computeCenter(this.props.data);

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/hubsy/cjpba7g8e1nkm2sqnagv0s2gr',
      zoom: this.props.zoom,
      center: center
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
