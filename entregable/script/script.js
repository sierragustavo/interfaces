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
  coord1 = { x: event.pageX - elemLeft, y: event.pageY - elemTop };
  const tool = obtenerHerramienta();
  const grosor = obtenerGrosor();
  const color = obtenerColor();
  coord2 = { x: event.pageX - elemLeft, y: event.pageY - elemTop};
  dibujar(tool, grosor, color, coord1, coord2);
});

canvas.addEventListener("mousemove", function (event) {
  if (dibujando) {
    const tool = obtenerHerramienta();
    const grosor = obtenerGrosor();
    const color = obtenerColor();
    coord2 = { x: event.pageX - elemLeft, y: event.pageY - elemTop };
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
  document.getElementById("input-imagen").value ='';
  canvas.style.filter='';
  canvas.width = defaultWidth;
  canvas.height = defaultHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.fill();
}

//TRIGGER QUE SE DISPARA AL MODIFICAR EL INPUT DE ARCHIVOS
inputFile.onchange = function (event) {
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

function reiniciarImagen() {
  canvas.style.filter='';
  ctx.putImageData(imagenOriginal, 0, 0);
}

function descargarImagen() {
  let descarga = canvas.toDataURL("image/png");
  /* PARA ASEGURARNOS DE QUE LA IMAGEN SE DESCARGA Y NO SE ABRE EN OTRA PESTAÑA */
  descarga = descarga.replace(
    /^data:image\/[^;]*/,
    "data:application/octet-stream"
  );
  this.href = descarga;
}

document
  .getElementById("boton-descarga")
  .addEventListener("click", descargarImagen, false);

//FILTROS COLORES

//OBTENER EL VALOR DE CADA PIXEL
function getRed(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
}

function getBlue(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
}

function filtroSepia() {
  let index;
  let pixel;
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      index = (x + y * imageData.width) * 4;
      pixel = 0.3 * getRed(imageData, x, y) + 0.6 * getGreen(imageData, x, y) + 0.1 * getBlue(imageData, x, y);
      let r = pixel + 35;
      let g = pixel + 20;
      let b = pixel;
      imageData.data[index + 0] = r;
      imageData.data[index + 1] = g;
      imageData.data[index + 2] = b;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function filtroBrillo() {
  let index;
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < imageData.width; x++) {
          for (let y = 0; y < imageData.height; y++) {
                  index = (x + y * imageData.width) * 4;
                  let r = imageData.data[index + 0] + 77;
                  let g = imageData.data[index + 1] + 77;
                  let b = imageData.data[index + 2] + 77;
                  imageData.data[index + 0] = r;
                  imageData.data[index + 1] = g;
                  imageData.data[index + 2] = b;
          }
  }
  ctx.putImageData(imageData, 0, 0);
}

function filtroNegativo() {
  let index;
  let imageData = ctx.getImageData(0, 0, canvas.width,canvas.height);
  for (let x = 0; x < imageData.width; x++) {
          for (let y = 0; y < imageData.height; y++) {
                  index = (x + y * imageData.width) * 4;
                  let r = 255 - getRed(imageData, x, y);
                  let g = 255 - getGreen(imageData, x, y);
                  let b = 255 - getBlue(imageData, x, y);
                  imageData.data[index + 0] = r;
                  imageData.data[index + 1] = g;
                  imageData.data[index + 2] = b;
          }
  }
  ctx.putImageData(imageData, 0, 0);
}

function filtroGris(){
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let grey = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]);
    data[i] = grey;
    data[i + 1] = grey;
    data[i + 2] = grey;
  }
  ctx.putImageData(imageData, 0, 0);
}

//BASICO
function filtroBlur(){
  canvas.style.filter = "blur(2px)";
}

function filtroSaturar(){
  canvas.style.filter = "saturate(200%)";
}