/* const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = "#000000";
ctx2.strokeRect(0,0,200,100);
ctx2.beginPath();
ctx2.arc(450,300,100,Math.PI,Math.PI);
ctx2.lineWidth = 15;
ctx2.lineCap = "round";
ctx2.strokeStyle = 'rgba(255,127,0,0.5)';
ctx2.stroke(); */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var imageData;

const imagen = new Image();
imagen.src = "GATURRO_1.webp";

imagen.onload = function () {
  ctx.drawImage(this, 0, 0);
  imageData = ctx.getImageData(0, 0, this.width, this.height);
  ctx.putImageData(imageData, 0, 0);
};

canvas.width = imagen.width;
canvas.height = imagen.height;

/* for (let x=0;x<width;x++){
    for(let y = 0;y<height;y++){
        setPixel(imageData,x,y,0,0,0,100);
    }
}
ctx.putImageData(imageData,0,0);

function setPixel(imageData,x,y,r,g,b,a){
    index = (x+y*imageData.width)*4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;
} */
