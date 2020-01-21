class Map {
	constructor(id, accessToken, contractName, apiKey) {
		this.map = L.map(id, {
			doubleClickZoom: false
		}).setView([-27.475573, 153.024134], 13);
		let iconWidth     = 42 * 0.8;
		let iconHeight    = 50 * 0.8;
		    this.blueIcon = L.icon({
			iconUrl    : 'images/bikeblue.png',
			iconSize   : [iconWidth, iconHeight],
			iconAnchor : [iconWidth / 2, iconHeight],
			popupAnchor: [0, -iconHeight]
		});
		this.redIcon = L.icon({
			iconUrl    : 'images/bikered.png',
			iconSize   : [iconWidth * 0.6, iconHeight * 0.6],
			iconAnchor : [iconWidth * 0.3, iconHeight * 0.6],
			popupAnchor: [0, -iconHeight * 0.6]
		});
		this.mapboxUrl   = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
		this.jcdecauxUrl = `https://api.jcdecaux.com/vls/v1/stations?contract=${contractName}&apiKey=${apiKey}`;
		this.addLayer();
		this.ajaxGet(this.jcdecauxUrl, this.addMarker.bind(this));
		this.hideDetailsOnMapClick();

		this.stationInfo = $('#station-info');
		this.choiceBtn   = $('#customer-info');
	}

	addLayer() {
		L.tileLayer(this.mapboxUrl, {
			maxZoom    : 20,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
				'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id        : 'mapbox/streets-v11',
			tileSize  : 512,
			zoomOffset: -1
		}).addTo(this.map);
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
			maxClusterRadius: 30
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
				this.map.setView([e.target._latlng.lat, e.target._latlng.lng]);
				sessionStorage.setItem('station', element.address);
			});
			stations.addLayer(station);
		});
		this.map.addLayer(stations);
	}

	displayDetails(station) {
		this.hideElements();
		this.stationInfo.text('');
		$('<p/>', {
			text: `Adresse : ${station.address}`
		}).appendTo(this.stationInfo);
		$('<p/>', {
			text: `${station.available_bike_stands} places`
		}).appendTo(this.stationInfo);
		$('<p/>', {
			text: `${station.available_bikes} vélos disponibles`
		}).appendTo(this.stationInfo);

		if (station.available_bikes) {
			this.choiceBtn.text('Choisir').addClass('btn');
		} else {
			this.choiceBtn.text('').removeClass('btn');
		}
		$('#station').css('display', 'initial');
	}

	hideElements() {
		$('#interaction').text('').removeClass('btn');
	}


	/* hidden station details */
	hideDetailsOnMapClick() {
		this.map.on('click', () => {
			// this.hideElements();
			$('#station').css('display', 'none');
		});
	}
}