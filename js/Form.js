class Form {
	constructor() {
		this.bookingSection = document.getElementById('booking-section');
		this.submit = document.getElementById('submit');
		this.alert = document.getElementById('alert');
		this.cancel = document.getElementById('cancel');
		this.newSubmit = false;
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

		this.submit.innerText = '';
		this.submit.appendChild(this.submit);
	}

	bookingListener() {
		this.submit.addEventListener('click', () => {
			let name = document.getElementById('name').value;
			let firstname = document.getElementById('firstname').value;
			if (name && firstname && !sessionStorage.getItem('limit')) {
				localStorage.setItem('name', name);
				localStorage.setItem('firstname', firstname);
				this.canvasInstantiation();
			} else if (!(name && firstname)) {
				this.alertInput();
			} else if (sessionStorage.getItem('limit')) {
				if (!this.newSubmit) {
					this.alert.innerText = "Une réservation est en cours. Veuillez l'annuler";
					this.submit.value = "Réserver à nouveau";
					this.newSubmit = true;
					console.log(this.newSubmit, 'from ');
					// this.cancel.addEventListener('click', () => {
					// 	this.resetAlert();
					// 	this.newSubmit = false;
					// 	console.log('from cancel');
					// });
				} else {
					sessionStorage.clear();
					this.newSubmit = false;
					this.canvasInstantiation();
					console.log(this.newSubmit, 'from newsubmit');
					this.resetAlert();
				}
			}
		});
	}
	alertInput() {
		this.alert.innerText = "Veuillez renseigner vos nom et prénom pour réserver !";
		setTimeout(() => {
			this.resetAlert();
			this.cancel.style.display = 'initial';
		}, 5000);
	}
	resetForm() {
		this.bookingSection.style.display = 'none';
		// this.submit.value
	}
	resetCanvas() {

	}
	resetAlert() { /* style management */
		// this.cancel.style.display = "none";
		this.submit.value = 'Réserver';
		this.alert.innerText = '';
	}
	canvasInstantiation() {
		new Canvas(
			document.getElementById("canvas-container"),
			document.getElementById("canvas")
		);
		this.submit.style.display = 'none';
		console.log('from myform');
	}
}