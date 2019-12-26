class Storage {
	constructor(address=null, name=null, firstname=null, set=false, timeLimit=0.1) {
		this.address = address;
		this.name = name;
		this.firstname = firstname;
		this.set = set;
		this.timeLimit = Date.now() + timeLimit * 60 * 1000;
		this.intervalId;
		this.data();
	}

	data() {
		if (this.set) {
			this.setData();
			this.getData();
		} else {
			this.getData();
		}
	}
	setData() {
		sessionStorage.setItem('address', this.address);
		sessionStorage.setItem('limit', this.timeLimit);
		localStorage.setItem('name', this.name);
		localStorage.setItem('firstname', this.firstname);
		document.getElementById('booking-app').style.display = 'none';
	}
	getData() {
		var infoContainer = document.getElementById('booking-info');
		this.intervalId = setInterval(() => {
			if (Date.now() < sessionStorage.getItem('limit')) {
				infoContainer.style.display = 'block';
				infoContainer.innerText = '';
				let info = document.createElement('p');
				info.innerText = 'Vélo réservé à la station ' + sessionStorage.getItem('address') 
				+ ' par ' + localStorage.getItem('firstname') + ' ' + localStorage.getItem('name');
				
				let timer = document.createElement('p');
				let deadline = (sessionStorage.getItem('limit') - Date.now()) / 1000;
				let dlMin = Math.trunc(deadline / 60);
				let dlSec = Math.trunc(deadline - dlMin * 60);
				let dlToString = dlMin + ' min ' + dlSec + ' s';
				timer.innerText = 'Temps restant : ' + dlToString;
				
				infoContainer.appendChild(info);
				infoContainer.appendChild(timer);
			} else {
				clearInterval(this.intervalId);
				sessionStorage.removeItem('address');
				sessionStorage.removeItem('limit');
				infoContainer.innerText = "La réservation à expirée";
				infoContainer.style.background =  'red';
				infoContainer.style.fontSize =  '30px';
			}
			}, 1000);
	}
}