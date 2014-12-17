// Base map
var osmLayer = new ol.layer.Tile({source: new ol.source.OSM()});

// Census map layer
var wmsLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/wms',
    params: {'LAYERS': 'g09_2014:Wien_normalized_6'}
  }),
  opacity: 0.6
});

var citybike = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g09_2014/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g09_2014:CITYBIKE&maxFeatures=50&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: 'data/city.png',
                 })
                  ]
            })
}); 

// Map object
olMap = new ol.Map({
  target: 'map',
  renderer: 'canvas',
  layers: [osmLayer, wmsLayer],
  view: new ol.View({
    center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 11,
    maxZoom: 18
  })
});

document.getElementById('citybike').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(citybike);
  }else{
    olMap.removeLayer(citybike);
  }
};


