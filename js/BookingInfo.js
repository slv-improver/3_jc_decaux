class BookingInfo {
	constructor(set=false, timeLimit=20) {
		this.set = set;
		this.timeLimit = Date.now() + timeLimit * 60 * 1000;
		this.intervalId;
		/* style a gerer avec des class css */
		this.infoContainer = document.getElementById('booking-info');
		if (this.set) {
			sessionStorage.setItem('limit', this.timeLimit);
			this.hiddenBookingApp();
			this.getData();
		} else {
			this.getData();
		}
	}

	/* storing */
	hiddenBookingApp() {
		// document.getElementById('booking-app').style.display = 'none'; /* disabling new form */
		document.getElementById('station').style.display = 'none';
		document.getElementById('canvas-container').textContent = '';
	}
	/* retrieving */
	getData() {
		this.intervalId = setInterval(() => {
			if (Date.now() < sessionStorage.getItem('limit')) {
				this.infoContainer.style.display = 'flex';
				this.infoContainer.innerText = '';
				this.createInfoP();
				this.createTimerP();
				this.createCancelBtn();
			} else if (!sessionStorage.getItem('limit')) {
				this.infoContainer.innerText = 'Réservation annulée. Vous pouvez réserver de nouveau';
				this.resetInfoContainer();
			} else {
				clearInterval(this.intervalId);
				sessionStorage.clear();
				this.infoContainer.innerText = "La réservation a expirée";
				this.infoContainer.style.background =  'red';
				this.infoContainer.style.fontSize =  '30px';
				this.infoContainer.style.fontWeight =  '900';
			}
			}, 1000);
	}

	createInfoP() {
		let info = document.createElement('p');
		info.innerText = `Vélo réservé à la station ${sessionStorage.getItem("station")}
		par ${localStorage.getItem("firstname")} ${localStorage.getItem("name")}`;

		this.infoContainer.appendChild(info);
	}
	createTimerP() {
		let timer = document.createElement('p');
		let deadline = (sessionStorage.getItem('limit') - Date.now()) / 1000;
		let dlMin = Math.trunc(deadline / 60);
		let dlSec = Math.trunc(deadline - dlMin * 60);
		if (dlSec < 10) {dlSec = "0" + dlSec};
		let dlToString = dlMin + ' min ' + dlSec + ' s';
		timer.innerText = 'Temps restant : ' + dlToString;

		this.infoContainer.appendChild(timer);
	}
	createCancelBtn() {
		let cancel = document.createElement('div');
		cancel.className = "material-icons";
		cancel.textContent = "cancel";

		this.infoContainer.appendChild(cancel);

		cancel.addEventListener('click', () => {
			sessionStorage.clear();
			setTimeout(() => {
				this.infoContainer.style.display = "none";
				this.resetInfoContainer();
			}, 5000);
		})
	}

	resetInfoContainer() {
		this.infoContainer.style.background =  'rgba(0, 0, 0, 0.8)';
		this.infoContainer.style.fontSize =  'initial';
		this.infoContainer.style.fontWeight =  'initial';
	}
}