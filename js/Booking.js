class Booking {
	constructor() {
		this.myMap = new Map(
			'mapid',
			"pk.eyJ1Ijoic2x2LWltcHJvdmVyIiwiYSI6ImNrM3hjZWZoeTBwOTMzZXA2NWZoYWcyN2MifQ.abeHwAe3XTh0mgdyror_Uw",
			"Brisbane",
			"7b223c89d17e9f045f732705dd821673730331be"
		);


		if (sessionStorage.getItem('limit')) {
			new BookingInfo();
		}
		this.choiceListener();
		this.interactionListener();
	}

	choiceListener() {
		let customer = $('#customer-info');
		customer.click(() => {
			if (customer.hasClass('btn')) {
				sessionStorage.setItem('station', this.myMap.station);
				customer.text('').removeClass('btn');
				this.myForm = new Form(customer);
			}
		});
	}

	interactionListener() {
		let interaction = $('#interaction');
		interaction.click(() => {
			if ($('#name').val() &&
				$('#firstname').val() &&
				!sessionStorage.getItem('limit')
				&& interaction.hasClass('btn')) {
					localStorage.setItem('name', $('#name').val());
					localStorage.setItem('firstname', $('#firstname').val());
					new Canvas(
						$("#canvas-container")
				);
			}
		});
	}

	canvasListener() {
		this.myCanvas.doneBtn.addEventListener("click", () => {
			this.myBookingInfo = new BookingInfo(true);
		})
	}
}