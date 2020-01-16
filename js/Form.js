class Form {
	constructor() {
		this.bookingSection = document.getElementById('booking-section');
		this.submitParent = document.getElementById('submit');
		this.alert = document.getElementById('alert');
		this.showForm();
		this.bookingListener();
	}

	showForm() {
		this.bookingSection.style.display = 'initial';
		document.getElementById('name').value = localStorage.getItem('name');
		document.getElementById('firstname').value = localStorage.getItem('firstname');
		this.addSubmitBtn();
	}

	addSubmitBtn() {
		this.submit = document.createElement('input');
		this.submit.type = 'button';
		this.submit.value = 'Réserver';
		this.submit.id = 'booking';

		this.submitParent.innerText = '';
		this.submitParent.appendChild(this.submit);
	}
	bookingListener() {
		this.submit.addEventListener('click', () => {
			let name = document.getElementById('name').value;
			let firstname = document.getElementById('firstname').value;
			if (name && firstname && !sessionStorage.getItem('limit')) {
				localStorage.setItem('name', name);
				localStorage.setItem('firstname', firstname);
				sessionStorage.setItem('station', document.getElementById('address').textContent);
				this.canvasInstantiation();
			} else if (!(name && firstname)) {
				this.alertInput();
			} else if (sessionStorage.getItem('limit')) {
				this.manageAlert("Une réservation est en cours. Veuillez l'annuler");
			}
		})
	}

	manageAlert(text) {
		this.alert.innerText = text;
		setTimeout(() => {
			this.alert.innerText = '';
		}, 5000);
	}

	canvasInstantiation() {
		new Canvas(
			document.getElementById("canvas-container"),
			document.getElementById("canvas")
		);
		console.log('canvas instance / form.js / canvasInstantiation');
		this.submit.style.display = 'none';
	}
}