class Rectangulo extends Figura {
  constructor(posX, posY, width, height, fill, context) {
    super(posX, posY, width, height, fill, context);
  }

  draw(posX, posY, width, height, fill, context) {
    let posX = random(ANCHO);
    let posY = random(ALTO);
    let width = random(40);
    let height = random(40);
    let color = getRandomRGBA();
    ctx.fillStyle = color;
    ctx.beginPath();
    if (estilo) {
      ctx.fillRect(posX, posY, width, height);
    } else {
    }
    ctx.fill();
    ctx.stroke();
  }
}
