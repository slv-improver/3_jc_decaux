
class Slider {
	constructor(slider, url, text, controller=false) {
		this.index = 0;
		this.ctrl = false;
		this.slider =  slider;
		this.url = url;
		this.text = text;
		this.controller = controller;
		this.appendSlider();
		if (this.controller) { /* btn controller */
			this.createControler();
			this.btnListener();
		}
		this.play();
		this.keyupListener();
	}

	appendSlider() { /* slider */
		let figure = document.createElement("figure");
		this.image = document.createElement("img");
		this.image.id = "image";
		this.caption = document.createElement("figcaption");
		this.caption.id = "caption";

		figure.appendChild(this.image);
		figure.appendChild(this.caption);
		this.slider.appendChild(figure);
		this.reloadSlider();
	}

	reloadSlider() {
		this.image.src = `images/${this.url[this.index]}`;
		this.caption.textContent = this.text[this.index];
	}

	play() { /* interval */
		this.ctrl = true;
		this.intervalId = setInterval(() => this.next(), 1000);
	}

	control() { /* pause / play */
		if (this.ctrl === true) {
			clearInterval(this.intervalId);
			this.btnControl.textContent = 'play_arrow';
			this.ctrl = false;
		} else if (this.ctrl === false) {
			this.play();
			this.btnControl.textContent = 'pause';
		}
	}
	
	next() {
		this.index++;
		if (this.index >= this.url.length) {
			this.index = 0;
		}
		this.reloadSlider();
	}

	previous() {
		this.index--;
		if (this.index < 0) {
			this.index = this.url.length - 1;
		}
		this.reloadSlider();
	}

	keyupListener() { /* press right, left and shift/control/0 */
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

	createControler() {
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
	}
	
	btnListener() { /* click on btn controller */
		this.btnPrevious.addEventListener('click', this.previous.bind(this));
		this.btnNext.addEventListener('click', this.next.bind(this));
		this.btnControl.addEventListener('click', this.control.bind(this));
	}
}