const main = document.querySelector("main");

export function mostrarInicio(mazo) {
  const tarjetasAPracticar = mazo.cardsToReview();
  const siguienteFechaDeRepaso = mazo.firstCard().reviewDate;
  main.classList.remove("repaso");
  const texto1 = document.createElement("p");
  const texto2 = document.createElement("p");
  const boton = document.createElement("button");
  boton.addEventListener("click", () => {
    mostrarPractica(tarjetasAPracticar, mazo);
  });
  boton.textContent = "PRACTICAR";
  boton.classList.add("boton-inicio");
  main.innerHTML = "";
  texto1.classList.add("texto-inicio");
  texto1.classList.add("texto-inicio");
  if (tarjetasAPracticar.length == 0) {
    texto1.textContent = "No hay tarjetas para practicar";
    texto2.textContent = `La siguiente Tarjeta está programada para las ${siguienteFechaDeRepaso.toTimeString()}`;
    main.appendChild(texto1);
    main.appendChild(texto2);
    setTimeout(() => {
      console.log("revisando");
      mostrarInicio(mazo);
    }, 3000);
  } else {
    texto1.textContent = `hay ${tarjetasAPracticar.length} tarjetas para practicar`;
    main.appendChild(texto1);
    main.appendChild(boton);
  }
}

function mostrarPractica(tarjetas, mazo) {
  let numeroDePreguntaActual = 0;
  main.classList.add("repaso");
  main.innerHTML = "";
  const contenedorTarjeta = document.createElement("div");
  const contenedorBotones = document.createElement("div");

  contenedorTarjeta.classList.add("contenedorTarjeta");
  const pregunta = document.createElement("p");
  const respuesta = document.createElement("p");
  const siguietnePreguntaBoton = document.createElement("button");
  siguietnePreguntaBoton.textContent = ">";
  siguietnePreguntaBoton.classList.add("siguientePreguntaBoton");
  siguietnePreguntaBoton.classList.add("hidden");

  pregunta.textContent = tarjetas[0].question;
  respuesta.textContent = tarjetas[0].answer;
  respuesta.classList.add("hidden");
  contenedorTarjeta.append(pregunta, respuesta, siguietnePreguntaBoton);

  contenedorBotones.classList.add("contenedorBotones");
  const botonNoLoRecuerdo = document.createElement("button");
  botonNoLoRecuerdo.textContent = "NO LO RECUERDO";
  const botonLoRecuerdo = document.createElement("button");
  botonLoRecuerdo.textContent = "LO RECUERDO";
  const botonFacil = document.createElement("button");
  botonFacil.textContent = "FÁCIL";
  contenedorBotones.append(botonNoLoRecuerdo, botonLoRecuerdo, botonFacil);
  main.append(contenedorTarjeta, contenedorBotones);

  botonNoLoRecuerdo.addEventListener("click", function () {
    tarjetas[numeroDePreguntaActual].otraVez();
    respuesta.classList.remove("hidden");
    siguietnePreguntaBoton.classList.remove("hidden");
    mazo.insertCard(tarjetas[numeroDePreguntaActual]);
    numeroDePreguntaActual++;
  });

  botonLoRecuerdo.addEventListener("click", function () {
    tarjetas[numeroDePreguntaActual].normal();
    respuesta.classList.remove("hidden");
    siguietnePreguntaBoton.classList.remove("hidden");
    mazo.insertCard(tarjetas[numeroDePreguntaActual]);
    numeroDePreguntaActual++;
  });

  botonFacil.addEventListener("click", function () {
    tarjetas[numeroDePreguntaActual].facil();
    respuesta.classList.remove("hidden");
    siguietnePreguntaBoton.classList.remove("hidden");
    mazo.insertCard(tarjetas[numeroDePreguntaActual]);
    numeroDePreguntaActual++;
  });

  siguietnePreguntaBoton.addEventListener("click", function () {
    if (numeroDePreguntaActual >= tarjetas.length - 1) {
      mostrarInicio(mazo);
    } else {
      pregunta.textContent = tarjetas[numeroDePreguntaActual].question;
      respuesta.textContent = tarjetas[numeroDePreguntaActual].answer;
      respuesta.classList.add("hidden");
      siguietnePreguntaBoton.classList.add("hidden");
      respuesta.classList.add("hidden");
    }
  });
}

// click
/** actualiza el tiempo
 *  muestra la respuesta y el botón
 *  inserta la tarjeta al árbol
 *
 */

// click
/**
 *
 */
