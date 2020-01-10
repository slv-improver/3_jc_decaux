class App {
	constructor() {
		this.mySlider = new Slider(
			document.getElementById('slider-wrapper'),
			[
				'people1.jpg',
				'station3.jpg'
			],
			[
				'Bienvenue à : EnRoute, EnLigne',
				'Venez prendre votre vélo à la station'
			],
			true
		);
		this.myMap = new Map(
			"pk.eyJ1Ijoic2x2LWltcHJvdmVyIiwiYSI6ImNrM3hjZWZoeTBwOTMzZXA2NWZoYWcyN2MifQ.abeHwAe3XTh0mgdyror_Uw",
			"Brisbane",
			"7b223c89d17e9f045f732705dd821673730331be",
			true,
			true
		);
		// this.myForm = new Form();
		if (sessionStorage.getItem('limit')) {
			new Storage();
		}
	}
}

new App();


/* 
docs
conception poo
class
instanciation
cluster

*/