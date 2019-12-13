var mymap = L.map('mapid').setView([-27.470125, 153.021072], 13);

var bikeIcon = L.icon({
  iconUrl: 'images/bikemap.png',

  iconSize:     [41.3, 48.5],
  iconAnchor:   [20.65, 24.25],
  popupAnchor:  [0, -24.25]
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2x2LWltcHJvdmVyIiwiYSI6ImNrM3hjZWZoeTBwOTMzZXA2NWZoYWcyN2MifQ.abeHwAe3XTh0mgdyror_Uw', {
  maxZoom: 20,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11'
}).addTo(mymap);

