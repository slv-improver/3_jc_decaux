class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
    this.showCanvas();
    this.onClick();
  }
  
  showCanvas() {
    document.getElementById('canvas-container').style.display = 'block';
  }
  draw(x, y, drag)  {
    this.context.beginPath();
    if (drag) {
      this.context.moveTo(x-1, y);
    }
    // this.context.moveTo(x, y);
    this.context.lineTo(x, y);
    this.context.closePath();
    this.context.stroke();
  }
  onClick() {
    var mainThis = this;
    $('#canvas').mousedown(function(e){
      mainThis.paint = true;
      mainThis.draw(e.offsetX, e.offsetY);
      console.log(e.offsetX, e.offsetY);
    });
    
    $('#canvas').mousemove(function(e){
      if(mainThis.paint){
        mainThis.draw(e.offsetX, e.offsetY, true);
        console.log(e.offsetX, e.offsetY);
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

new Canvas(document.getElementById('canvas'));