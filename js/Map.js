class Map {
	constructor(accessToken, contractName, apiKey) {
		this.mymap = L.map('mapid').setView([-27.475573, 153.024134], 13);
		this.blueIcon = L.icon({
		  iconUrl: 'images/bikeblue.png',
		  iconSize:     [41.3, 48.5],
		  iconAnchor:   [20.65, 24.25],
		  popupAnchor:  [0, -24.25]
		});
		this.redIcon = L.icon({
		  iconUrl: 'images/bikered.png',
		  iconSize:     [41.3, 48.5],
		  iconAnchor:   [20.65, 24.25],
		  popupAnchor:  [0, -24.25]
		});
		this.accessToken = accessToken;
		this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=" + contractName + "&apiKey=" + apiKey;
		this.addLayer();
		this.ajaxGet(this.url, this.addMarker.bind(this));
		this.hiddenForm();
		this.form;
	}
	
	addLayer() { 
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, {
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
		var req = new XMLHttpRequest();
		req.open("GET", url);
		req.addEventListener("load", function () {
      // req.onreadystatechange = function () {if this.readyState == 4} // 4 == XMLHttpRequest.DONE
      if (200 <= req.status && req.status < 400) {
        callback(req.responseText);
      } else {
        console.error(req.status + " " + req.statusText + " " + url);
      }
    });
    req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
	}

	/* marker and class form */
	addMarker(response) {
		let brisbane = JSON.parse(response);
		brisbane.forEach(element => { /* blueIcon and redIcon */
			if (element.available_bikes > 0) {
				var station = L.marker([element.position.lat, element.position.lng], {
					icon: this.blueIcon}).addTo(this.mymap).bindPopup(element.address);
			} else {
				station = L.marker([element.position.lat, element.position.lng], {
					icon: this.redIcon}).addTo(this.mymap).bindPopup(element.address);
			} /* instanciation onclick */
			station.addEventListener('click', function() {
				this.form = new Form(element, true); 
			}.bind(this));
		});
	}                                                     

	/* hidden station details */
	hiddenForm() {
		document.getElementById('mapid').addEventListener("click", function () {
			if (document.getElementById('mapid').style.outline === 'none') {
				document.getElementById('station').style.display = 'none';
				document.getElementById('canvas-container').style.display = 'none';
			}
		});
	}
}

