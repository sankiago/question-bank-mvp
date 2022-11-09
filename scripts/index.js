/* import avl from "./avl.js"; */
import Card from "./card.js";
import Deck from "./Deck.js";
import { mostrarInicio } from "../vistas.js";
// Preguntas de prueba
const response = await fetch("./scripts/questions.json").then((res) =>
  res.json()
);
const cards = response.map((obj) => new Card(obj.question, obj.answer));
const mazo = new Deck(cards);

const cartasPaRevisar = mazo.cardsToReview();
const siguienteTarjeta = mazo.firstCard();
console.log(cartasPaRevisar);
mostrarInicio(mazo);
//número de preguntas disponibles
//sacar preguntas disponibles
//insertar
