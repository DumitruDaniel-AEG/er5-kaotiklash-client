export default class CardMovement {
  #card;
  #previousState;
  #state;
  #gridPosition;

  constructor(card, state) {
    this.#card = card;
    this.#state = state;
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

  getWeaponType() {
    return this.#card.getWeaponType();
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

  getArmorType() {
    return this.#card.getArmorType();
  }

  getInitialDurability() {
    return this.#card.getInitialDurability();
  }

  getInitialPrepTimeInRounds() {
    return this.#card.getInitialPrepTimeInRounds();
  }

  getCurrentDurability() {
    return this.#card.getCurrentDurability();
  }

  getCurrentPrepTimeInRounds() {
    return this.#card.getCurrentPrepTimeInRounds();
  }

  getInitialDurationInRounds() {
    return this.#card.getIntialDurationInRounds();
  }

  getInitialPrepTimeInRounds() {
    return this.#card.getInitialPrepTimeInRounds();
  }

  getCurrentDurationInRounds() {
    return this.#card.getCurrentDurationInRounds();
  }

  getCurrentPrepTimeInRounds() {
    return this.#card.getCurrentPrepTimeInRounds();
  }

  getInitialDurationInRounds() {
    return this.#card.getInitialDurationInRounds();
  }

  getCurrentDurationInRounds() {
    return this.#card.getCurrentDurationInRounds();
  }

  getSpecialEffect() {
    return this.#card.getSpecialEffect();
  }

  getEffect() {
    return this.#card.getEffect();
  }

  getXCoordinate() {
    return this.#card.getXCoordinate();
  }

  getYCoordinate() {
    return this.#card.getYCoordinate();
  }

  setXCoordinate(newXCoordinate) {
    return this.#card.setXCoordinate(newXCoordinate);
  }

  setYCoordinate(newYCoordinate) {
    return this.#card.setYCoordinate(newYCoordinate);
  }

  getChaoticEventName() {
    return this.#card.getChaoticEventName();
  }

  getChaoticEventDescription() {
    return this.#card.getChaoticEventDescription();
  }

  getImageSet() {
    return this.#card.getImageSet();
  }

  getPreviousState() {
    return this.#previousState;
  }

  setPreviousState(newPreviousState) {
    this.#previousState = newPreviousState;
  }

  getState() {
    return this.#state;
  }

  getWeapon() {
    return this.#card.getWeapon();
  }

  getMinionWeaponType() {
    return this.#card.getWeapon().getWeaponType();
  }

  getWeaponCurrentDamage() {
    return this.#card.getWeapon().getCurrentDamage();
  }

  setState(newState) {
    this.#state = newState;
  }

  setCurrentHP(newHP) {
    this.#card.setCurrentHP(newHP);
  }

  setWeapon(weapon) {
    this.#card.setWeapon(weapon);
  }

  getGridPosition() {
    return this.#gridPosition;
  }

  setGridPosition(position) {
    this.#gridPosition = position;
  }

  setCurrenPrepTimeInRounds(newPrepTimeInRounds) {
    this.#card.setCurrenPrepTimeInRounds(newPrepTimeInRounds);
  }

  isMouseOver() {
    return this.#card.isMouseOver();
  }

  setIsMouseOver(isMouseOver) {
    this.#card.setIsMouseOver(isMouseOver);
  }

  isLeftClicked() {
    return this.#card.isLeftClicked();
  }

  setIsLeftClicked(isLeftClicked) {
    this.#card.setIsLeftClicked(isLeftClicked);
  }

  getBoxIsPositionedIn(gridWhereToLookForBox, minion) {
    return this.#card.getBoxIsPositionedIn(gridWhereToLookForBox, minion);
  }
}
