const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const ANCHO = canvas.width;
const ALTO = canvas.height;

let figuras = [];

const CANT_FIGURAS = 30;
dibujar();
function dibujar() {
  for (let i = 0; i < CANT_FIGURAS; i++) {
    addFigura(i < CANT_FIGURAS / 2);
  }
}

function addFigura(estilo) {
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
