import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import icon from '../images/icons/marker-red.png';

import '../css/components/map.css';



class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaHVic3kiLCJhIjoiY2pwYXl1NHl3MDYxNDNxcDhkbm5qZm9ueiJ9.rTv8xFX5CHvdxHpz08id8Q';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/hubsy/cjpb9rjyw7eid2sqjf1g7p6l1',
      zoom: 12,
      center: [2.34711000, 48.872353333333] // Paris
    });

    map.addControl(new mapboxgl.NavigationControl());

    this.props.data.forEach(obj => {
      var marker = document.createElement('div');
      marker.style.backgroundImage = `url(${icon})`;
      marker.className = 'marker';

    const marker = new mapboxgl.Marker(marker)
      .setLngLat([obj.node.data.lng, obj.node.data.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(`<h3> Hubsy ${obj.node.data.name} </h3><p> ${obj.node.data.street} ${obj.node.data.postcode} </p>`))
      .addTo(map);
    })
  }

  componentDidMount() {
    this.initMap()
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
