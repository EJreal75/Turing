
var pasoR;
var pasoL;

$(function () {
  dibujarGrafo(0);
  $("#iniciar").click(function () {
    dibujarGrafo(1);
    completarPreliminares();
  });
});

function dibujarGrafo(num) {
  var container = document.getElementById("mynetwork");
  switch (num) {
    case 0:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L" color=blue]; 2 -> 3[label=" B / B / R" color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue]; 3[ borderWidth=7]}';
      break;
    case 1:
      var dot = 'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label=" B / B / L " color=blue]; 2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" a / a / R " color=red]; 2 -> 2[label=" a / a / L" color=blue]; 3[ borderWidth=7]}';
      break;
    case 2:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L " color=red];2[color = red];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue]; 3[ borderWidth=7]}';
      break;
    case 3:
      var dot = 'dinetwork {node[shape=circle];1->2[color=red];1 -> 2 [label=" B / B / L " color=blue];2 -> 3[label=" B / B / R " color=red]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue];3[color = red]; 3[ borderWidth=7]}';
      break;
    case 4:
      var dot = 'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label=" B / B / L " color = blue]; 2 -> 3[label=" B / B / R " color = blue]; 1 -> 1[label=" b / a / R " color = red]; 2 -> 2[label=" a / a / L " color = blue]; 3[ borderWidth=7]}';
      break;
    case 5:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L " color=blue];2[color = red];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a > a / R " color=blue]; 2 -> 2[label=" a / a / L " color=red]; 3[ borderWidth=7]}';
      break;
    case 6:
      var dot = 'dinetwork {node[shape=circle];1->2[color=red];1 -> 2 [label=" B / B / L " color=blue];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue];3[color = red]; 3[ borderWidth=7]}';
      break;
    default:
      break;
  }

  var data = vis.parseDOTNetwork(dot);

  var options = {
    nodes: {
      shape: "dot",
      size: 50,
      font: {
        size: 32,
      },
      borderWidth: 1,
      shadow: true,
    },
    layout: {
      hierarchical: {
        sortMethod: "directed",
      },
    },
    edges: {
      width: 3,
      length: 190,
      font: {
        size: 16,
      },
      shadow: true,
      //color: "blue",
    },
  };
  var network = new vis.Network(container, data, options);
}

function leerCadena() {
  $("#carrete").html('');
  var texto = $("#entrada").val();
  return texto;
}

function convertirCadenaEnArreglo(texto) {
  var arreglo = texto.split("");
  return arreglo;
}

function limpiarCinta() {
  $("#carrete").html('');
}

function dibujarCinta(arreglo) {
  let tam = contarArreglo(arreglo);
  $("#carrete").append('<div id = "elemento0" class="circulo"></div>');
  let i;
  for (i = 0; i < tam; i++) {
    $("#carrete").append('<div class="circulo" id = "elemento">' + arreglo[i] + '</div>');
    $("#elemento").attr("id", "elemento" + (i + 1));
  }
  $("#carrete").append('<div class="circulo" id = "elemento"></div>');
  $("#elemento").attr("id", "elemento" + (i + 1));
}

function contarArreglo(arreglo) {
  var tam = arreglo.length;
  return tam;
}

function animarCinta() {
  anime({
    targets: '.circulo',
    translateY: 50,
    loop: false,
    delay: function (el, i, l) {
      return i * 100;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 100;
    }
  });
}

function completarPreliminares() {
  limpiarCinta();
  var texto = leerCadena();
  var arreglo = convertirCadenaEnArreglo(texto);
  pasoL = contarArreglo(arreglo) + 1;
  pasoR = 2;
  dibujarCinta(arreglo);
  animarCinta();
  anime({
    targets: '#elemento' + 1,
    backgroundColor: '#3f51b5',
  });
  $("#correr").click(function () {
    recorrerDerecha(1, contarArreglo(arreglo));

  });
  $("#paso").click(function () {
    recorrerPaso(contarArreglo(arreglo));
  });
}

function recorrerPaso(tam) {
  console.log(pasoR);
  if (pasoR <= tam + 1) {

    console.log("iteracion" + pasoR);

    anime({
      targets: '#elemento' + pasoR,
      backgroundColor: '#3f51b5',
    });
    anime({
      targets: '#elemento' + (pasoR - 1),
      backgroundColor: '#b9b3f5',
    });


    if ($('#elemento' + (pasoR - 1)).text() == "a") {
      $('#elemento' + (pasoR - 1)).text("a");
      dibujarGrafo(1);
    }
    if ($('#elemento' + (pasoR - 1)).text() == "b") {
      $('#elemento' + (pasoR - 1)).text("a");
      dibujarGrafo(4);
    }

    pasoR++;

  }
  else if (pasoL == 0) {
    dibujarGrafo(3);
    anime({
      targets: '#elemento' + 0,
      backgroundColor: '#b9b3f5',
    });
    anime({
      targets: '#elemento' + 1,
      backgroundColor: '#3f51b5',
    });
    pasoL--;

  }
  else if (pasoL == -1) {
    setTimeout(function () {
      dibujarGrafo(6);
      anime({
        targets: '#elemento' + 1,
        backgroundColor: '#b9b3f5',
      });

    }, 100);
    setTimeout(function () {
      anime({
        targets: '#elemento' + 1,
        backgroundColor: '#3f51b5',
      });

    }, 500);
  }
  else {
    console.log("iteracion" + pasoL);
    anime({
      targets: '#elemento' + pasoL,
      backgroundColor: '#b9b3f5',
    });
    pasoL--;
    anime({
      targets: '#elemento' + pasoL,
      backgroundColor: '#3f51b5',
    });
    if (pasoL == tam) {
      dibujarGrafo(2);
    }
    else {
      dibujarGrafo(5);
    }
  }

}

function recorrerDerecha(i, tam) {
  let delay = 3000 - $("#myRange").val();
  if (i <= tam) {

    console.log("iteracion" + i);
    setTimeout(function () {
      if ($('#elemento' + (i - 1)).text() == "a") {
        $('#elemento' + (i - 1)).text("a");
        dibujarGrafo(1);
      }
      anime({
        targets: '#elemento' + (i - 1),
        backgroundColor: '#b9b3f5',
      });

      if ($('#elemento' + (i - 1)).text() == "b") {
        $('#elemento' + (i - 1)).text("a");
        dibujarGrafo(4);
      }
      anime({
        targets: '#elemento' + i,
        backgroundColor: '#3f51b5',
      });

    }, (i * delay) + 500);
    i++;
    recorrerDerecha(i, tam);
  } else {
    leerVacioDerecha(i);
  }
}

function leerVacioDerecha(i) {
  console.log(i);
  let delay = 3000 - $("#myRange").val();
  setTimeout(function () {
    anime({
      targets: '#elemento' + (i - 1),
      backgroundColor: '#3f51b5',
    });
    dibujarGrafo(2);
    anime({
      targets: '#elemento' + (i),
      backgroundColor: '#b9b3f5',
    });

  }, (i * delay) + 500);
  console.log(i);

  recorrerIzquierda(i, i + 1);
}

function recorrerIzquierda(i, j) {
  let delay1 = 3000 - $("#myRange").val();
  console.log(i, j);
  if (i > 1) {
    console.log("iteracion" + i);
    setTimeout(function () {
      dibujarGrafo(5);
      anime({
        targets: '#elemento' + i,
        backgroundColor: '#b9b3f5',
      });
      anime({
        targets: '#elemento' + (i - 1),
        backgroundColor: '#3f51b5',
      });
    }, (j * delay1) + 500);
    i--;
    j++;
    recorrerIzquierda(i, j);
  } else {
    leerVacioIzquierda(j);
  }


}


function leerVacioIzquierda(i) {
  let delay2 = 3000 - $("#myRange").val();
  setTimeout(function () {
    dibujarGrafo(3);
    anime({
      targets: '#elemento0',
      backgroundColor: '#b9b3f5',
    });
    anime({
      targets: '#elemento1',
      backgroundColor: '#3f51b5',
    });
  }, (i * delay2) + 500);

  i++;
  setTimeout(function () {

    anime({
      targets: '#elemento1',
      backgroundColor: '#b9b3f5',
    });
  }, (i * delay2) + 100);
  setTimeout(function () {
    dibujarGrafo(6);
    anime({
      targets: '#elemento1',
      backgroundColor: '#3f51b5',
    });
  }, (i * delay2) + 500);

}