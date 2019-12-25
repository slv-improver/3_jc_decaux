
class Slider {
	constructor(slider, url, text, controller=false) {
		this.index = 0;
		this.ctrl = 0;
		this.slider =  slider;
		this.url = url;
		this.text = text;
		this.controller = controller;
		this.appendSlider();
		this.play();
		this.keyupListener();
	}

	appendSlider() {
		let figure = document.createElement("figure");
		this.image = document.createElement("img");
		this.image.id = "image";
		this.caption = document.createElement("figcaption");
		this.caption.id = "caption";

		figure.appendChild(this.image);
		figure.appendChild(this.caption);
		this.slider.appendChild(figure);
		this.reload();

		if (this.controller) {
			let controller = document.createElement("div");
			controller.id = "controller";
			this.btnPrevious = document.createElement('i');
			this.btnPrevious.textContent = "skip_previous";/* navigate_before */
			this.btnPrevious.className = "material-icons";
			this.btnControl = document.createElement('i');
			this.btnControl.textContent = "pause";
			this.btnControl.className = "material-icons";
			this.btnNext = document.createElement('i');
			this.btnNext.textContent = "skip_next";/* navigate_next */
			this.btnNext.className = "material-icons";

			controller.appendChild(this.btnPrevious);
			controller.appendChild(this.btnControl);
			controller.appendChild(this.btnNext);
			this.slider.appendChild(controller);
			this.btnListener();
		}
	}

	reload() {
		this.image.src = 'images/' + this.url[this.index];
		this.caption.textContent = this.text[this.index];
	}

	play() {
		// this.intervalId = setInterval(this.next.bind(this), 5000);
		this.ctrl = 1;
		this.intervalId = setInterval(() => this.next(), 1000);
	}

	control() {
		if (this.ctrl === 1) {
			clearInterval(this.intervalId);
			this.btnControl.textContent = 'play_arrow';
			this.ctrl = 0;
		} else if (this.ctrl === 0) {
			this.play();
			this.btnControl.textContent = 'pause';
		}
	}
	
	next() {
		this.index++;
		if (this.index >= this.url.length) {
			this.index = 0;
		}
		this.reload();
	}

	previous() {
		this.index--;
		if (this.index < 0) {
			this.index = this.url.length - 1;
		}
		this.reload();
	}

	keyupListener() {
		document.addEventListener('keyup', (e) => {
			switch (e.keyCode) {
				case 39:
					this.next();
					break;
				case 37:
					this.previous();
					break;
				case 17:
				case 16:
				case 96:
					this.control();
					break;
			
				default:
					break;
			}
		})
	}

	btnListener() {
		this.btnPrevious.addEventListener('click', this.previous.bind(this));
		this.btnNext.addEventListener('click', this.next.bind(this));
		this.btnControl.addEventListener('click', this.control.bind(this));
	}
}