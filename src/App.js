const React = require('react');
const { MapContainer, TileLayer, Polygon } = require('react-leaflet');
require('leaflet/dist/leaflet.css');
const { statesData } = require('./data');
require('./App.css');

const center = [40.63463151377654, -97.89969605983609];

function App() {
  return React.createElement(
    MapContainer,
    { center: center, zoom: 10, style: { width: '100vw', height: '100vh' } },
    React.createElement(TileLayer, {
      url: `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAPTILER_KEY}`, 
      attribution: '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>',
    }),
    statesData.features.map((state) => {
      const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
      return React.createElement(Polygon, {
        pathOptions: {
          fillColor: '#337AB7', 
          fillOpacity: 0.7,
          weight: 2,
          opacity: 1,
          dashArray: 3,
          color: 'white',
        },
        positions: coordinates,
        eventHandlers: {
          mouseover: (e) => {
            const layer = e.target;
            layer.setStyle({
              dashArray: '',
              fillColor: '#0056B3', 
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              color: 'white',
            });
          },
          mouseout: (e) => {
            const layer = e.target;
            layer.setStyle({
              fillOpacity: 0.7,
              weight: 2,
              dashArray: '3',
              color: 'white',
              fillColor: '#337AB7',
            });
          },
          click: (e) => {},
        },
      });
    })
  );
}

module.exports = App;
