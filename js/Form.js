class Form {
	constructor() {
		this.section = document.getElementById('booking-section');
		this.alert = document.getElementById('alert');
		this.cancel = document.getElementById('cancel');
		this.submit = document.getElementById('booking');
		this.newSubmit = false;
		this.showForm();
		this.bookingListener();
	}

	showForm() {
		
		this.section.style.display = 'initial';
		document.getElementById('name').value = localStorage.getItem('name');
		document.getElementById('firstname').value = localStorage.getItem('firstname');
	}

	bookingListener() {
		this.submit.addEventListener('click', () => {
			let name = document.getElementById('name').value;
			let firstname = document.getElementById('firstname').value;
			if (name && firstname && !sessionStorage.getItem('limit')) {
				this.mycanvas = new Canvas(
					document.getElementById("canvas"),
					this.address,
					name,
					firstname
				);
				console.log('from myform');
			} else if (!(name && firstname)) {
				this.alert.innerText = "Veuillez renseigner vos nom et prénom pour réserver !";
				setTimeout(() => {
					this.resetAlert();
					this.cancel.style.display = 'initial';
				}, 5000);
			} else if (sessionStorage.getItem('limit')) {
				if (!this.newSubmit) { /* probleme display canvas lors du rechargement de la page */
					this.alert.innerText = "Une réservation est en cours";
					this.cancel.style.display = 'initial';
					this.submit.value = "Réserver à nouveau";
					this.newSubmit = true;
					console.log(this.newSubmit, 'from ');
					this.cancel.addEventListener('click', () => {
						this.resetAlert();
						this.newSubmit = false;
						console.log('from cancel');
					})
				} else {
					sessionStorage.removeItem('address');
					sessionStorage.removeItem('limit');
					this.newSubmit = false;
					// this.mycanvas = new Canvas(
					// 	document.getElementById("canvas"),
					// 	this.address,
					// 	name,
					// 	firstname
					// );
					console.log(this.newSubmit, 'from newsubmit');
					this.resetAlert();
				}
			}
		});
	}
	resetForm() {
		this.section.style.display = 'none';
		// this.submit.value
	}
	resetCanvas() {

	}
	resetAlert() { /* style management */
		this.cancel.style.display = "none";
		this.submit.value = 'Réserver';
		this.alert.innerText = '';
	}
	
}