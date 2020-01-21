class Form {
	constructor(div) {
		this.customerInfo = div;
		this.displayForm();
		this.bookingVerif(); /* eventListener */
	}

	displayForm() {
		this.createInput('Nom : ', 'name', this.customerInfo);
		this.createInput('Prénom : ', 'firstname', this.customerInfo);
		this.displayBtn();
	}

	createInput(label, id, parent) {
		$('<input/>', {
			type: 'text',
			id: id,
			value: localStorage.getItem(id)
		}).appendTo(
			$('<label/>', {
				for: id,
				text: label
			}).appendTo(
				$('<p/>').appendTo(parent)
			)
		);
	}

	/* bug apparition reserver lors du click sur marker */
	bookingVerif() {
		$('#interaction').click(() => {
			if (!($('#name').val() && $('#firstname').val())) {
				this.displayAlert("Veuillez renseigner vos nom et prénom pour réserver.");
			} else if (sessionStorage.getItem('limit')) {
				this.displayAlert("Une réservation est en cours. Veuillez l'annuler pour réserver de nouveau.");
			}
		});
	}

	displayAlert(text) {
		$('#interaction').text(text).addClass('alert').removeClass('btn');
		setTimeout(() => {
			this.displayBtn();
		}, 5000);
	}

	displayBtn() {
		$('#interaction')
			.text('Réserver')
			.addClass('btn')
			.removeClass('alert');
	}

}