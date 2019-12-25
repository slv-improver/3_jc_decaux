class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint;
    this.clearBtn = document.getElementById('clear');
    this.doneBtn = document.getElementById('confirmation');
    this.showCanvas();
    this.onClick();
    this.showHelper();
    this.eventListener()
  }

  showCanvas() {
    document.getElementById('canvas-container').style.display = 'block';
  }

  showHelper() {
    this.context.font = '20px serif';
    this.context.fillText('Veuillez signez et valider', 5, 15);
    this.context.fillText('pour confirmer la réservation', 10, 30);
  }

  addClick(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  eventListener() {
    this.clearBtn.addEventListener('click', () => {
      this.clear();
      this.clickX = new Array();
      this.clickY = new Array();
      this.clickDrag = new Array();
    });
  }
  clear() {
    this.context.clearRect(
      0, 0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  draw() {
    this.clear(); // Clears the canvas

    this.context.strokeStyle = "#1a74db";
    this.context.lineJoin = "round";
    this.context.lineWidth = 4;

    for(var i=0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if(this.clickDrag[i] && i){
        this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
      }else{
        this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
      }
      this.context.lineTo(this.clickX[i], this.clickY[i]);
      this.context.closePath();
      this.context.stroke();
    }
  }

  onClick() {
    var mainThis = this;
    $('#canvas').mousedown(function(e){
      mainThis.paint = true;
      mainThis.addClick(e.offsetX, e.offsetY);
      mainThis.draw();
    });
    
    $('#canvas').mousemove(function(e){
      if(mainThis.paint){
        mainThis.addClick(e.offsetX, e.offsetY, true);
        mainThis.draw();
      }
    });
    
    $('#canvas').mouseup(function(e){
      mainThis.paint = false;
    });
    
    $('#canvas').mouseleave(function(e){
      mainThis.paint = false;
    });
  }
}

