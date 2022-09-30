class Circulo extends Figura {
  constructor(posX, posY, width, height, fill, context) {
    super(posX, posY, width, height, fill, context);
  }

  draw() {
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.width / 2, 0, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  estaSeleccionado(x, y) {
    let _x = this.posX - x;
    let _y = this.posY - y;
    return Math.sqrt(_x * _x + _y * _y) < this.width;
  }
  moveTo(x, y) {
    ctx.clearRect(this.posX - this.width / 2 - 1, this.posY - this.width / 2 - 1, this.width / 2 * 2 + 2, this.width / 2 * 2 + 2);
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.arc(x, y, this.width / 2, 0, 2 * Math.PI, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    this.posX = x;
    this.posY = y;
  }
}
