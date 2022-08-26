class Rectangulo extends Figura {
  constructor(posX, posY, width, height, fill, context) {
    super(posX, posY, width, height, fill, context);
  }

  draw() {
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.fill();
    ctx.stroke();
  }
}
