const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const ANCHO = canvas.width;
const ALTO = canvas.height;

let figuras = [];

const CANT_FIGURAS = 30;
dibujar();

function dibujar() {
  paintCanvas(ctx);
  for (let i = 0; i < CANT_FIGURAS; i++) {
    addFigura(i < CANT_FIGURAS / 2);
  }
  for (i = 0; i < CANT_FIGURAS; i++) {
    figuras[i].draw();
  }
}

function addFigura(estilo) {
  let posX = random(ANCHO);
  let posY = random(ALTO);
  let width = random(50);
  let height = random(50);
  let color = getRandomRGBA();

  if (estilo) {
    rect = new Rectangulo(posX, posY, width, height, color, ctx);
    figuras.push(rect);
  } else {
    circulo = new Circulo(posX, posY, width, height, color, ctx);
    figuras.push(circulo);
  }
}

function paintCanvas(ctx) {
  let fondo = new Rectangulo(0, 0, ANCHO, ALTO, `rgba(230,230,230,100)`, ctx);
  fondo.draw();
}
function getRandomRGBA() {
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);
  let a = 255;
  return `rgba(${r},${g},${b},${a})`;
}

function random(maximo) {
  return Math.round(Math.random() * maximo);
}
