class Map {
	constructor(id, accessToken, contractName, apiKey) {
		this.mymap = L.map(id, {
			doubleClickZoom: false
		}).setView([-27.475573, 153.024134], 13);
		let blueWidth = 42 * 0.8,
			blueHeight = 50 * 0.8,
			div = 0.6,
			redWidth = blueWidth * div,
			redHeight = blueHeight * div;
		this.blueIcon = L.icon({
			iconUrl: 'images/bikeblue.png',
			iconSize: [blueWidth, blueHeight],
			iconAnchor: [blueWidth / 2, blueHeight],
			popupAnchor: [0, -blueHeight]
		});
		this.redIcon = L.icon({
			iconUrl: 'images/bikered.png',
			iconSize: [redWidth, redHeight],
			iconAnchor: [redWidth, redHeight],
			popupAnchor: [0, -redHeight]
		});
		this.mapboxUrl = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
		this.jcdecauxUrl = `https://api.jcdecaux.com/vls/v1/stations?contract=${contractName}&apiKey=${apiKey}`;
		this.addLayer();
		this.ajaxGet(this.jcdecauxUrl, this.addMarker.bind(this));
		this.hideDetailsOnMapClick();
		this.fieldset = document.getElementById('station');
		// this.createChoiceBtn('station-choice');
		// this.choice = document.getElementById('station-choice');

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
		let stations = new L.markerClusterGroup({
			maxClusterRadius: 50
		});
		let station;
		response.forEach(element => {
			/* blueIcon and redIcon */
			if (element.available_bikes > 0) {
				station = L.marker([element.position.lat, element.position.lng], {
					icon: this.blueIcon
				});
			} else {
				station = L.marker([element.position.lat, element.position.lng], {
					icon: this.redIcon
				});
			}
			station.bindPopup(element.status === "OPEN" ? "Ouverte" : "Fermée").on('click', (e) => {
				this.displayDetails(element);
				this.mymap.setView([e.target._latlng.lat, e.target._latlng.lng]);
			});
			stations.addLayer(station);
		});
		this.mymap.addLayer(stations);
	}

	// createChoiceBtn(id) {
	// 	this.choice = document.createElement('input');
	// 	this.choice.type = 'button';
	// 	this.choice.id = id;
	// 	console.log('id');
	// 	this.choice.value = "Choisir";
	// 	document.getElementById('choice').textContent = '';
	// 	document.getElementById('choice').appendChild(this.choice);
	// }

	displayDetails(station) {
		this.fieldset.style.display = 'initial';
		document.getElementById('address').textContent = station.address;
		document.getElementById('places').textContent = station.available_bike_stands;
		document.getElementById('available').textContent = station.available_bikes;
		document.getElementById('station-choice').style.display = 'initial';
		this.hideObjects();

	}

	hideObjects() {
		document.getElementById('booking-section').style.display = 'none';
		document.getElementById('canvas-container').style.display = 'none';
	}

	/* hidden station details */
	hideDetailsOnMapClick() {
		this.mymap.addEventListener("click", () => {
			this.fieldset.style.display = 'none';
			this.hideObjects();
		});
	}
}