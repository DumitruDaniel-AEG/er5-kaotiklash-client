import Card from "./Card.js";

export default class Special extends Card {
  #effect;
  #initialDurationInRounds;
  #currentDurationInRounds;
  #initialPrepTimeInRounds;
  #currentPrepTimeInRounds;

  constructor(
    category,
    id,
    name,
    description,
    effect,
    initialDurationInRounds,
    initialPrepTimeInRounds
  ) {
    super(category, id, name, description);

    this.#effect = effect;
    this.#initialDurationInRounds = this.#currentDurationInRounds =
      initialDurationInRounds;
    this.#initialPrepTimeInRounds = this.#currentPrepTimeInRounds =
      initialPrepTimeInRounds;
  }

  getEffect() {
    return this.#effect;
  }

  getInitialDurationInRounds() {
    return this.#initialDurationInRounds;
  }

  getCurrentDurationInRounds() {
    return this.#currentDurationInRounds;
  }

  getInitialPrepTimeInRounds() {
    return this.#initialPrepTimeInRounds;
  }

  getCurrentPrepTimeInRounds() {
    return this.#currentPrepTimeInRounds;
  }
}
