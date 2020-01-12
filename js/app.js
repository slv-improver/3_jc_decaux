class App {
	constructor() {
		this.mySlider = new Slider(
			document.getElementById('slider-wrapper'),
			[
				'people1.jpg',
				'1chooseStation.png',
				'2customerInfos.png',
				'3signature.png',
				'4twentyMin.png',
				'station3.jpg'
			],
			[
				'Bienvenue à : EnRoute, EnLigne',
				'Choisissez votre station',
				'Renseignez vos nom et prénom',
				'Signez dans l\'encadré',
				'Votre réservation est effective pour une durée de 20 min',
				'Venez prendre votre vélo à la station'
			],
			true /* controller */
		);
		this.myMap = new Map(
			'mapid',
			"pk.eyJ1Ijoic2x2LWltcHJvdmVyIiwiYSI6ImNrM3hjZWZoeTBwOTMzZXA2NWZoYWcyN2MifQ.abeHwAe3XTh0mgdyror_Uw",
			"Brisbane",
			"7b223c89d17e9f045f732705dd821673730331be",
			true,
			true
		);
		// this.myForm = new Form();
		// this.myCanvas = new Canvas(
		// 	document.getElementById("canvas"),
		// );
		if (sessionStorage.getItem('limit')) {
			new Storage();
		}
	}
}

let myApp = new App();


/* 
fonction
docs
conception poo
class
instanciation
cluster

*/