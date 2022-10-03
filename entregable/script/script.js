//CARGO CANVAS
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//IMAGEN
let inputFile = document.getElementById("input-imagen");
let imagenOriginal;

//LECTURA CORRECTA DE LOS PIXELES TENIENDO EN CUENTA MARGENES DE LA PAGINA
const elemLeft = canvas.offsetLeft + canvas.clientLeft;
const elemTop = canvas.offsetTop + canvas.clientTop;

//VALORES DEL CANVAS POR DEFECTO
const defaultHeight = canvas.height;
const defaultWidth = canvas.width;

let dibujando = false;

let coord1;
let coord2;

canvas.addEventListener("mousedown", function (event) {
  dibujando = true;
  coord1 = { x: event.pageX - elemLeft, y: event.pageY };
  const tool = obtenerHerramienta();
  const grosor = obtenerGrosor();
  const color = obtenerColor();
  coord2 = { x: event.pageX - elemLeft, y: event.pageY };
  dibujar(tool, grosor, color, coord1, coord2);
});

canvas.addEventListener("mousemove", function (event) {
  if (dibujando) {
    const tool = obtenerHerramienta();
    const grosor = obtenerGrosor();
    const color = obtenerColor();
    coord2 = { x: event.pageX - elemLeft, y: event.pageY };
    dibujar(tool, grosor, color, coord1, coord2);
    coord1 = coord2;
  }
});

canvas.addEventListener("mouseup", function (event) {
  dibujando = false;
});

function obtenerHerramienta() {
  let herramientas = document.getElementsByName("boton-paint");
  let herramienta;
  for (let i = 0; i < herramientas.length; i++) {
    if (herramientas[i].checked == true) herramienta = herramientas[i];
  }
  return herramienta.value;
}

function obtenerGrosor() {
  return (grosor = document.getElementById("grosor").value);
}

function obtenerColor() {
  return (color = document.getElementById("input-color").value);
}

function dibujar(tool, grosor, color, coord1, coord2) {
  if (tool == "boton-borrar") {
    color = "rgba(255, 255, 255, 1)";
  }
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = grosor;
  ctx.moveTo(coord1.x, coord1.y);
  ctx.lineTo(coord2.x, coord2.y);
  ctx.stroke();
}

function limpiarCanvas() {
  canvas.width = defaultWidth;
  canvas.height = defaultHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.fill();
}

//TRIGGER QUE SE DISPARA AL MODIFICAR EL INPUT DE ARCHIVOS
inputFile.onchange = function (event) {
  limpiarCanvas();
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (readerEvent) => {
    let content = readerEvent.target.result;
    let imagen = new Image();
    imagen.src = content;
    imagen.onload = function () {
      canvas.width = imagen.width;
      canvas.height = imagen.height;
      ctx.drawImage(this, 0, 0);
      let imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
      imagenOriginal = imageData;
      ctx.putImageData(imageData, 0, 0);
    };
  };
};

function removerFiltros() {
  ctx.putImageData(imagenOriginal, 0, 0);
}
