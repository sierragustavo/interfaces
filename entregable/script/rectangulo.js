class Rectangulo extends Figura {
  constructor(posX, posY, width, height, fill, context) {
    super(posX, posY, width, height, fill, context);
  }

  draw(coord2) {
    ctx.beginPath();
    ctx.lineCap="round";
    ctx.strokeStyle = this.fill;
    ctx.moveTo(this.posX,this.posY)
    ctx.lineTo(coord2.x,coord2.y)
    ctx.stroke();
  }

  estaSeleccionado(x, y) {
    return (
      x > this.posX &&
      x < this.width + this.posX &&
      y > this.posY &&
      y < this.width + this.posY
    );
  }

  moveTo(x, y) {
    ctx.clearRect(this.posX,this.posY,this.width,this.height);
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.fillRect(x, y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
    this.posX = x;
    this.posY = y;
  }
}
