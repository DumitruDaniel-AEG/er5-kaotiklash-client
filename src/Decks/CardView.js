export default class CardView {
  #card;
  #xCoordinate;
  #yCoordinate;
  #imageSet;

  constructor(card, xCoordinate, yCoordinate, imageSet) {
    this.#card = card;
    this.#xCoordinate = xCoordinate;
    this.#yCoordinate = yCoordinate;
    this.#imageSet = imageSet;
  }

  getCategory() {
    return this.#card.getCategory();
  }

  getID() {
    return this.#card.getID();
  }

  getName() {
    return this.#card.getName();
  }

  getDescription() {
    return this.#card.getDescription();
  }

  getSpecialSkill() {
    return this.#card.getSpecialSkill();
  }

  getInitialHP() {
    return this.#card.getInitialHP();
  }

  getCurrentHP() {
    return this.#card.getCurrentHP();
  }

  getInitialMadness() {
    return this.#card.getInitialMadness();
  }

  getCurrentMadness() {
    return this.#card.getCurrentMadness();
  }

  getInitialAttack() {
    return this.#card.getInitialAttack();
  }

  getCurrentAttack() {
    return this.#card.getCurrentAttack();
  }

  getInitialDefense() {
    return this.#card.getInitialDefense();
  }

  getCurrentDefense() {
    return this.#card.getCurrentDefense();
  }

  getInitialDamage() {
    return this.#card.getInitialDamage();
  }

  getInitialDurability() {
    return this.#card.getInitialDurability();
  }

  getInitialPrepTimeInRounds() {
    return this.#card.getInitialPrepTimeInRounds();
  }

  getCurrentDamage() {
    return this.#card.getCurrentDamage();
  }

  getCurrentDurability() {
    return this.#card.getCurrentDurability();
  }

  getCurrentPrepTimeInRounds() {
    return this.#card.getCurrentPrepTimeInRounds();
  }

  getCurrentArmorDurability() {
    return this.#card.getCurrentDurability();
  }

  getCurrentArmorPrepTimeInRounds() {
    return this.#card.getCurrentPrepTimeInRounds();
  }

  getSpecialCurrentDurationInRounds() {
    return this.#card.getCurrentDurationInRounds();
  }

  getSpecialCurrentPrepTimeInRounds() {
    return this.#card.getCurrentPrepTimeInRounds();
  }

  getRareCurrentDurationInRounds() {
    return this.#card.getCurrentDurationInRounds();
  }

  getImageSet() {
    return this.#imageSet;
  }

  getXCoordinate() {
    return this.#xCoordinate;
  }

  getYCoordinate() {
    return this.#yCoordinate;
  }

  setXCoordinate(newXCoordinate) {
    this.#xCoordinate = newXCoordinate;
  }

  setYCoordinate(newYCoordinate) {
    this.#yCoordinate = newYCoordinate;
  }
}
