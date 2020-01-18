class Form {
	constructor(stationBtn) {
		this.bookingSection = document.getElementById('booking-section');
		this.stationBtn = stationBtn;
		this.submitParent = document.getElementById('submit');
		this.submit;
		this.alert = document.getElementById('alert');
		this.complete = false;
		this.stationBtnListener();
	}

	stationBtnListener() {
		this.stationBtn.addEventListener('click', () => {
			this.showForm();
			document.getElementById('station-choice').style.display = 'none';
		});
	}

	showForm() {
		this.bookingSection.style.display = 'initial';
		document.getElementById('name').value = localStorage.getItem('name');
		document.getElementById('firstname').value = localStorage.getItem('firstname');
		this.addSubmitBtn();
		this.formListener();
	}

	addSubmitBtn() {
		this.submit = document.createElement('input');
		this.submit.type = 'button';
		this.submit.value = 'Réserver';
		this.submit.id = 'booking';

		this.submitParent.innerText = '';
		this.submitParent.appendChild(this.submit);
	}
	formListener() {
		this.submit.addEventListener('click', () => {
			let name = document.getElementById('name').value;
			let firstname = document.getElementById('firstname').value;
				localStorage.setItem('name', name);
				localStorage.setItem('firstname', firstname);
				sessionStorage.setItem('station', document.getElementById('address').textContent);
				this.submitParent.textContent = '';
			if (!(name && firstname)) {
				this.manageAlert('Veuillez renseigner vos nom et prénom pour réserver');
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
		this.submit.style.display = 'none';
	}
}