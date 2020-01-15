class Map {
	constructor(id, accessToken, contractName, apiKey, customerInfo=false, canvas=false) {
		this.mymap = L.map(id, {
			doubleClickZoom: false
		}).setView([-27.475573, 153.024134], 13);
		let iconWidth = 42*0.8;
		let iconHeight = 50	*0.8;
		this.blueIcon = L.icon({
		  iconUrl: 'images/bikeblue.png',
		  iconSize:     [iconWidth, iconHeight],
		  iconAnchor:   [iconWidth/2, iconHeight],
			popupAnchor:  [0, -iconHeight]
		});
		this.redIcon = L.icon({
		  iconUrl: 'images/bikered.png',
		  iconSize:     [iconWidth*0.6, iconHeight*0.6],
		  iconAnchor:   [iconWidth*0.3, iconHeight*0.6],
		  popupAnchor:  [0, -iconHeight*0.6]
		});
		this.mapboxUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
		this.jcdecauxUrl = `https://api.jcdecaux.com/vls/v1/stations?contract=${contractName}&apiKey=${apiKey}`;
		this.addLayer();
		this.ajaxGet(this.jcdecauxUrl, this.addMarker.bind(this));
		this.hiddenDetailsOnMapClick();
		this.fieldset = document.getElementById('station');
		this.choice = document.getElementById('station-choice');
		if (customerInfo) {this.formInstantiation()};
		if (canvas) {}
	}
	
	addLayer() { 
		L.tileLayer(this.mapboxUrl, {
			maxZoom: 20,
		  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		  id: 'mapbox/streets-v11',
		  tileSize: 512,
		  zoomOffset: -1
		}).addTo(this.mymap);
	}

	/* API */
	ajaxGet(url, callback) {
		let req = new XMLHttpRequest();
		req.open("GET", url);
		req.addEventListener("load", function () {
      // req.onreadystatechange = function () {if this.readyState == 4} // 4 == XMLHttpRequest.DONE
      if (200 <= req.status && req.status < 400) {
        callback(JSON.parse(req.responseText));
      } else {
        console.error(`${req.status} ${req.statusText} ${url}`);
      }
    });
    req.addEventListener("error", function () {
      console.error(`Erreur réseau avec l'URL ${url}`);
    });
    req.send(null);
	}

	/* marker and class form */
	addMarker(response) {
		let stations = new L.markerClusterGroup();
		let station;
		response.forEach(element => { /* blueIcon and redIcon */
			if (element.available_bikes > 0) {
				station = L.marker([element.position.lat, element.position.lng], {
					icon: this.blueIcon
				});
			} else {
				station = L.marker([element.position.lat, element.position.lng], {
					icon: this.redIcon});
			}
			station.bindPopup(element.status==="OPEN"?"Ouverte":"Fermée").on('click', (e) => {
				this.displayDetails(element);
				this.mymap.setView([e.target._latlng.lat, e.target._latlng.lng]);
			});
			stations.addLayer(station);
		});
		this.mymap.addLayer(stations);
	}

	displayDetails(station) {
		this.fieldset.style.display = 'initial';
		document.getElementById('address').textContent = station.address;
		document.getElementById('places').textContent = station.available_bike_stands;
		document.getElementById('available').textContent = station.available_bikes;
		if (station.available_bikes) {
			this.choice.style.display = 'initial';
		} else {
			this.choice.style.display = 'none';
		}
		this.hiddenObjects();
	}

	hiddenObjects() {
		document.getElementById('booking-section').style.display = 'none';
		document.getElementById('canvas-container').style.display = 'none';
	}

	/* hidden station details */
	hiddenDetailsOnMapClick() {
		this.mymap.addEventListener("click", () => {
			this.fieldset.style.display = 'none';
			this.hiddenObjects();
		});
	}
	
	formInstantiation() {
		this.choice.addEventListener('click', () => {
				new Form();
				this.choice.style.display = 'none';
		});
	}
}