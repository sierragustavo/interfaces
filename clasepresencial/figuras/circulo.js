class Circulo extends Figura {
  constructor(posX, posY, width, height, fill, context) {
    super(posX, posY, width, height, fill, context);
  }

  draw() {
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.ellipse(this.posX, this.posY, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
