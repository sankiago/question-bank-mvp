import Card from "./card.js";
import avl, { Tree, Node } from "./avl.js";
export default class Deck {
  constructor(cards = []) {
    this.tree = new Tree();
    cards.forEach((card) => {
      const cardNode = new Node({ key: card });
      this.tree.insert(cardNode);
    });
  }

  cardsToReview() {
    return this.tree.getAvailableCards(this.tree.root, 0, new Date().getTime());
  }

  extractCard(card) {
    this.tree.root = this.tree.remove(this.tree.find(card, this.tree.root));
  }

  insertCard(card) {
    const cardNode = new Node({ key: card });
    this.tree.insert(cardNode);
  }

  firstCard() {
    return this.tree.findMin(this.tree.root).key;
  }
}
