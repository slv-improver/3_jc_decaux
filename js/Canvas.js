class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint;
    this.showCanvas();
    this.onClick();
  }

  showCanvas() {
    this.canvas.style.display = 'block';
  }

  addClick(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  draw() {
    this.context.clearRect(
      0, 0,
      this.context.canvas.width,
      this.context.canvas.height
    ); // Clears the canvas

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
      mainThis.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      mainThis.draw();
    });
    
    $('#canvas').mousemove(function(e){
      if(mainThis.paint){
        mainThis.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
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

