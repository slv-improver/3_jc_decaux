class Booking {
	constructor() {
		this.myMap = new Map(
			'mapid',
			"pk.eyJ1Ijoic2x2LWltcHJvdmVyIiwiYSI6ImNrM3hjZWZoeTBwOTMzZXA2NWZoYWcyN2MifQ.abeHwAe3XTh0mgdyror_Uw",
			"Brisbane",
			"7b223c89d17e9f045f732705dd821673730331be"
		);

		// this.myForm = new Form(document.getElementById('station-choice'));
		// this.myCanvas = new Canvas(
		// 	document.getElementById("canvas-container"),
		// 	document.getElementById("canvas")
		// );

		if (sessionStorage.getItem('limit')) {
			new BookingInfo();
		}
	}

	formListener() {
		this.myForm.submitParent.addEventListener('click', () => {
			if (document.getElementById('name').value &&
				document.getElementById('firstname').value &&
				!sessionStorage.getItem('limit')) {
				this.myCanvas.showCanvas();
			}
		});
	}

	canvasListener() {
		this.myCanvas.doneBtn.addEventListener("click", () => {
			this.myBookingInfo = new BookingInfo(true);
		})
	}
}