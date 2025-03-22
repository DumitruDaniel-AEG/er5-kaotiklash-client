import { CardState } from "../Game/constants.js";

export default class Deck {
  #deckType;
  #cards;

  constructor(deckType, cards) {
    this.#deckType = deckType;
    this.#cards = cards;
  }

  getDeckType() {
    return this.#deckType;
  }

  getCards() {
    return this.#cards;
  }

  insertCard(card) {
    this.#cards.push(card);
  }

  lookForHoveredCard(mouseInput) {
    for (let i = 0; i < this.getCards().length; i++) {
      const currentCard = this.getCards()[i];

      const [isMouseWithinCardWidth, isMouseWithinCardHeight] =
        currentCard.checkIfMouseWithinCardWidthAndHeight(mouseInput);

      if (isMouseWithinCardWidth && isMouseWithinCardHeight) {
        return currentCard;
      }
    }
  }

  lookForCardThatIsntHoveredAnymore(mouseInput) {
    for (let i = 0; i < this.getCards().length; i++) {
      const currentCard = this.getCards()[i];

      const [isMouseWithinCardWidth, isMouseWithinCardHeight] =
        currentCard.checkIfMouseWithinCardWidthAndHeight(mouseInput);

      if (
        (!isMouseWithinCardWidth || !isMouseWithinCardHeight) &&
        (currentCard.getState() === CardState.INACTIVE_HOVERED ||
          currentCard.getState() === CardState.HOVERED)
      ) {
        return currentCard;
      }
    }
  }

  checkIfAnyCardIsExpanded() {
    for (let i = 0; i < this.getCards().length; i++) {
      const currentCard = this.getCards()[i];

      if (currentCard.getState() === CardState.EXPANDED) {
        return true;
      }
    }

    return false;
  }
}
