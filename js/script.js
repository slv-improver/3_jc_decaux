
let myslider = new Slider(
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

let mymap = new Map(
	"pk.eyJ1Ijoic2x2LWltcHJvdmVyIiwiYSI6ImNrM3hjZWZoeTBwOTMzZXA2NWZoYWcyN2MifQ.abeHwAe3XTh0mgdyror_Uw",
	"Brisbane",
	"7b223c89d17e9f045f732705dd821673730331be"
);


if (sessionStorage.getItem('limit')) {
	new Storage();
}

/* 
docs
poo
class
instance

*/