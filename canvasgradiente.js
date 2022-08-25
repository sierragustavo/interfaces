let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const ancho = canvas.getAttribute("width");
const alto = canvas.getAttribute("height");
let imageData = ctx.createImageData(ancho, alto);
let r = 0;
let g = 0;
let b = 0;
let a = 255;

for (let i = 0; i < ancho; i++) {
  for (let j = 0; j < alto; j++) {
    rellenar(imageData, i, j, r, g, b, a);

  }
  r++;
  g++;
  b++;
  a--;
}
ctx.putImageData(imageData, 0, 0);

function rellenar(imageData, x, y, r, g, b, a) {
  index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}
