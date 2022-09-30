const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let elemLeft = canvas.offsetLeft + canvas.clientLeft;
let elemTop = canvas.offsetTop + canvas.clientTop;
let dibujando = false;
let coord1;
let coord2;

canvas.addEventListener("mousedown", function (event) {
  dibujando = true;
  coord1 = { x: event.pageX - elemLeft, y: event.pageY };
});

canvas.addEventListener("mousemove", function (event) {
  if (dibujando == true) {
    const tool = obtenerHerramienta();
    const grosor = obtenerGrosor();
    const color = obtenerColor();
    const forma = obtenerForma();
    coord2 = { x: event.pageX - elemLeft, y: event.pageY };
    dibujar(tool, grosor, color, coord1, coord2, forma);
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
  let grosor = document.getElementById("grosor").value;
  return grosor;
}

function obtenerColor() {
  let color = document.getElementById("input-color").value;
  return color;
}

function obtenerForma() {
  let formas = document.getElementsByName("boton-forma");
  let forma;
  for (let i = 0; i < formas.length; i++) {
    if (formas[i].checked == true) forma = formas[i];
  }
  return forma.value;
}

function dibujar(tool, grosor, color, coord1, coord2, forma) {
  if (tool == "boton-dibujar") {
    if (forma == "boton-rectangulo") {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = grosor;
      ctx.moveTo(coord1.x, coord1.y);
      ctx.lineTo(coord2.x, coord2.y);
      ctx.stroke();
    } else {
      let circulo = new Circulo(x, y, grosor, grosor, color, ctx);
      circulo.draw();
    }
  }
  if (tool == "boton-borrar") {
    color = "rgba(255, 255, 255, 1)";
    if (forma == "boton-rectangulo") {
      let rectangulo = new Rectangulo(x, y, grosor, grosor, color, ctx);
      rectangulo.draw();
    } else {
      let circulo = new Circulo(x, y, grosor, grosor, color, ctx);
      circulo.draw();
    }
  }
}
