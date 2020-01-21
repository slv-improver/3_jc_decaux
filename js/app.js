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
		this.myBooking = new Booking();
	}
}

let a = new App();







