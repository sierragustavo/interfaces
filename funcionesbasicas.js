const max = 100;

let x = [[],[]];

var matriz = document.getElementById("matriz");
var maximo = document.getElementById("maximo");
var maximopares = document.getElementById("maximopares");
var minimoimpares = document.getElementById("minimoimpares");
var promediofilas = document.getElementById("promediofilas");

let asd = [[1,2,3],[1,2,3,4,5]];
console.log(asd[1].length);



for (let i = 0 ; i<max ; i++){
    for (let j = 0 ; j<max ; j++){
        x[[i][j]] = Math.floor((Math.random()*100));
        var text = document.createTextNode(x[[i][j]]);
        matriz.appendChild(text);
    }
    var text2 = document.createElement("br");
    matriz.appendChild(text2);
}

let maximoValor = 0;
for (let i = 0 ; i<max; i++){
    for (let j = 0 ; j<max ; j++){
        if (x[[i][j]]>maximoValor)
        maximoValor = x[[i][j]];
    }
}
maximo.innerHTML = maximoValor;


let maximoparesValor = 0;
let minimoimparesValor = 100;
for (let i = 0 ; i<max; i++){
    for (let j = 0 ; j<max ; j++){
        if(i%2==0 && x[[i][j]]>maximoparesValor){
            maximoparesValor = x[[i][j]];
        }
        if (i%2 != 0 && x[[i][j]]<minimoimparesValor){
            minimoimparesValor = [[i][j]];
        }
    }
}
maximopares.innerHTML = maximoparesValor;
minimoimpares.innerHTML = minimoimparesValor;

let arrayPromedio = [];

for (let i = 0 ; i<max; i++){
    let aux = 0;
    for (let j = 0 ; j<max ; j++){
        console.log(x[[i][j]])
        aux+=x[[i][j]];
    }
    arrayPromedio.push(aux/max);
}

console.log(arrayPromedio);
promediofilas.innerHTML = arrayPromedio;