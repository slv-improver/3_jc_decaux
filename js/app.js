class App {
	constructor() {
		this.mySlider = new Slider(
			document.getElementById('slider-wrapper'),
			{
				'people1.jpg': 'Bienvenue à : EnRoute, EnLigne',
				'1chooseStation.png': 'Choisissez votre station',
				'2customerInfos.png': 'Renseignez vos nom et prénom',
				'3signature.png': 'Signez dans l\'encadré',
				'4twentyMin.png': 'Votre réservation est effective pour une durée de 20 min',
				'station3.jpg': 'Venez prendre votre vélo à la station'
			},
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

		if (sessionStorage.getItem('limit')) {
			new BookingInfo();
		}
	}
}

new App();

/* 
fonction
docs
conception poo
class
instanciation
cluster

*/