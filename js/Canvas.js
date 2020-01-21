class Canvas {
	constructor(container) {
		this.container = container;
		this.createCanvas();
		this.context = $('#canvas')[0].getContext('2d');
		this.showHelper();
		this.clickX = new Array();
		this.clickY = new Array();
		this.clickDrag = new Array();
		this.paint = false;
		this.signature = false;
		this.onClick();
		this.createBtnCanvas();
		this.clearBtn;
		this.doneBtn;
	}

	createCanvas() {
		this.container.text('');
		this.canvas = $('<canvas/>', {
				'id': 'canvas'
			})
			.text('Your browser does not support canvas tag.');
		this.container.append(this.canvas);
	}

	showHelper() {
		/* helper on canvas */
		this.context.font = '20px serif';
		this.context.fillStyle = "rgba(0, 0, 0, .5)";
		this.context.fillText('Veuillez signer et valider ✔', 5, 50);
		this.context.fillText('pour confirmer la réservation', 5, 70);
	}

	createBtn(id, text) {
		return $('<div>/', {
			id: id,
			class: 'material-icons',
			text: text
		}).appendTo(this.container);
	}

	createBtnCanvas() {
		this.clearBtn = this.createBtn('clear', 'replay');
		this.clearListener();
		this.canvas.mousemove(() => {
			if (this.clickX.length === 30) {
				this.doneBtn = this.createBtn('confirmation', 'done');
				this.signature = true;
				this.doneListener();
			}
		});
	}

	/* eventListener */
	clearListener() {
		/* on canvas' buttons */
		this.clearBtn.click(() => {
			this.clear();
			this.clickX = new Array();
			this.clickY = new Array();
			this.clickDrag = new Array();
			this.showHelper();
		});
	}

	doneListener() {
		this.doneBtn.click(() => {
			this.myBooking = new BookingInfo(
				true,
				2
			);
			/* style reset */
			// var infoContainer = document.getElementById('booking-info');
			// infoContainer.style.background = 'rgba(0, 0, 0, 0.8)';
			// infoContainer.style.fontSize = 'unset';
			// infoContainer.style.fontWeight = 'unset';
		})
	}

	/* drawing functions */
	clear() {
		this.context.clearRect(
			0, 0,
			this.context.canvas.width,
			this.context.canvas.height
		);
		this.signature = false;
	}

	addClick(x, y, dragging) {
		this.clickX.push(x);
		this.clickY.push(y);
		this.clickDrag.push(dragging);
	}

	draw() {
		this.clear();

		this.context.strokeStyle = "#1a74db";
		this.context.lineJoin = "round";
		this.context.lineWidth = 2;

		for (var i = 0; i < this.clickX.length; i++) {
			this.context.beginPath();
			if (this.clickDrag[i] && i) {
				/* clickDrag[true] && i>0 */
				this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
			} else {
				this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
			}
			this.context.lineTo(this.clickX[i], this.clickY[i]);
			this.context.closePath();
			this.context.stroke();
		}
	}

	onClick() {
		/* eventListener to draw function */
		var mainThis = this;
		$('#canvas').mousedown(function (e) {
			mainThis.paint = true;
			mainThis.addClick(e.offsetX, e.offsetY);
			mainThis.draw();
		});

		$('#canvas').mousemove(function (e) {
			if (mainThis.paint) {
				mainThis.addClick(e.offsetX, e.offsetY, true);
				mainThis.draw();
			}
		});

		$('#canvas').mouseup(function (e) {
			mainThis.paint = false;
		});

		$('#canvas').mouseleave(function (e) {
			mainThis.paint = false;
		});
	}
}