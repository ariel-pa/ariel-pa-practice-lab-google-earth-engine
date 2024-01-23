const L = require('leaflet');
const ee = require('@google/earthengine');

// Inicia la API de Earth Engine
ee.initialize();

// Crea un mapa Leaflet
const map = L.map('map').setView([0, 0], 2); // Centro del mapa y nivel de zoom

// Añade una capa base de Google Maps
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

// Define una región de interés (ROI)
const roi = ee.Geometry.Rectangle([-180, -90, 180, 90]); // Mundo entero

// Agrega una capa de imagen de Google Earth Engine
const image = ee.Image('COPERNICUS/S2')
  .select(['B4', 'B3', 'B2'])
  .clip(roi);

const imageUrl = image.getThumbURL({
  dimensions: 800,
  region: roi,
});

const overlay = L.imageOverlay(imageUrl, roi.getBounds()).addTo(map);

// Agrega control de capas
const baseMaps = {
  'Google Maps': L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }),
};

const overlayMaps = {
  'Imagen de Earth Engine': overlay,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
