class Form {
	constructor(element, signature=false) {
		this.address = element.address;
		this.available_bike_stands = element.available_bike_stands;
		this.available_bikes = element.available_bikes;
		this.submit = document.getElementById('booking');
		this.signature = signature;
		this.showForm();
	}

	showForm() {
		document.getElementById('station').style.display = 'block';
		document.getElementById('address').textContent = this.address;
		document.getElementById('places').textContent = this.available_bike_stands;
		document.getElementById('available').textContent = this.available_bikes;
		document.getElementById('name').value = localStorage.getItem('name');
		document.getElementById('firstname').value = localStorage.getItem('firstname');
		
		this.bookingListener();
	}

	bookingListener() {
		this.submit.addEventListener('click', () => {
			var name = document.getElementById('name').value;
			var firstname = document.getElementById('firstname').value;
			if (this.signature) {
				this.canvas = new Canvas(
					document.getElementById("canvas"),
					this.address,
					name,
					firstname,
					true
				);
			} else {
				new Storage(
					this.address,
					name,
					firstname,
					true
				);
			}
		});
	}
	
}