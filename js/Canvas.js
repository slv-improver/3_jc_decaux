class Canvas {
	constructor(container, canvas) {
		this.container = container;
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.clickX = new Array();
		this.clickY = new Array();
		this.clickDrag = new Array();
		this.paint;
		this.doneBtn = document.getElementById('confirmation');
		this.clearBtn = document.getElementById('clear');
		// this.showCanvas();
		this.onClick();
		this.clearListener();
		this.createDoneBtn();
	}

	showCanvas() {
		this.container.style.display = 'block';
		this.doneBtn.textContent = '';
		this.clear(true);
	}

	createDoneBtn() {
		this.canvas.addEventListener('mousemove', () => {
			if (this.clickX.length === 30) {
				this.doneBtn.innerText = "done";
			}
		})
	}

	showHelper() {
		/* helper on canvas */
		this.context.font = '20px serif';
		this.context.fillStyle = "rgba(0, 0, 0, .5)";
		this.context.fillText('Veuillez signer et valider ✔', 5, 50);
		this.context.fillText('pour confirmer la réservation', 5, 70);
	}

	clearListener() {
		/* on canvas' buttons */
		this.clearBtn.addEventListener('click', () => {
			this.clear(true);
		});
	}

	clear(all) {
		this.context.clearRect(
			0, 0,
			this.context.canvas.width,
			this.context.canvas.height
		);
		this.signature = false;
		if (all) {
			this.clickX = new Array();
			this.clickY = new Array();
			this.clickDrag = new Array();
			this.showHelper();
		}
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