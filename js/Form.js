class Form {
	constructor(element) {
		this.address = element.address;
		this.available_bike_stands = element.available_bike_stands;
		this.available_bikes = element.available_bikes;
		this.alert = document.getElementById('alert');
		this.cancel = document.getElementById('cancel');
		this.submit = document.getElementById('booking');
		this.newSubmit = false;
		this.showForm();
		this.bookingListener();
	}

	showForm() {
		document.getElementById('station').style.display = 'block';
		document.getElementById('address').textContent = this.address;
		document.getElementById('places').textContent = this.available_bike_stands;
		document.getElementById('available').textContent = this.available_bikes;
		document.getElementById('name').value = localStorage.getItem('name');
		document.getElementById('firstname').value = localStorage.getItem('firstname');
 
	}

	bookingListener() {
		this.submit.addEventListener('click', () => {
			var name = document.getElementById('name').value;
			var firstname = document.getElementById('firstname').value;
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
					this.reset();
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
						this.reset();
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
					this.reset();
				}
			}
		});
	}
	reset() { /* style management */
		this.cancel.style.display = "none";
		this.submit.value = 'Réserver';
		this.alert.innerText = '';
	}
	
}