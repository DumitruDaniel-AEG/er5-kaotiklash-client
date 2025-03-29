import Phase from "./Phase.js";
import AttackEvent from "../Events/AttackEvent.js";
import {
  PlayerID,
  CardState,
  DeckType,
  GridType,
  AttackPhaseState,
  PhaseType,
  WeaponType,
} from "../Game/constants.js";
import { globals } from "../index.js";
import PhasesMessages from "../Messages/PhasesMessages.js";

export default class AttackPhase extends Phase {
  #enemyMovementGridDeck;
  #currentPlayerMovementGridDeck;
  #enemyMovementGrid;
  #currentPlayerMovementGrid;

  constructor(
    state,
    mouseInput,
    enemyMovementGridDeck,
    currentPlayerMovementGridDeck,
    enemyMovementGrid,
    currentPlayerMovementGrid
  ) {
    super(state, mouseInput);

    this.#enemyMovementGridDeck = enemyMovementGridDeck;
    this.#currentPlayerMovementGridDeck = currentPlayerMovementGridDeck;
    this.#enemyMovementGrid = enemyMovementGrid;
    this.#currentPlayerMovementGrid = currentPlayerMovementGrid;
  }

  static create(
    player,
    deckContainer,
    board,
    mouseInput,
    events,
    currentPlayer
  ) {
    let enemyMovementGridDeck;
    let currentPlayerMovementGridDeck;
    let enemyMovementGrid;
    let currentPlayerMovementGrid;

    if (player === currentPlayer) {
      currentPlayerMovementGrid =
        board.getGrids()[GridType.PLAYER_1_BATTLEFIELD];

      enemyMovementGrid = board.getGrids()[GridType.PLAYER_2_BATTLEFIELD];
    } else {
      currentPlayerMovementGrid =
        board.getGrids()[GridType.PLAYER_2_BATTLEFIELD];

      enemyMovementGrid = board.getGrids()[GridType.PLAYER_1_BATTLEFIELD];
    }

    if (player.getID() === PlayerID.PLAYER_1) {
      currentPlayerMovementGridDeck =
        deckContainer.getDecks()[DeckType.PLAYER_1_MINIONS_IN_PLAY];

      enemyMovementGridDeck =
        deckContainer.getDecks()[DeckType.PLAYER_2_MINIONS_IN_PLAY];
    } else {
      currentPlayerMovementGridDeck =
        deckContainer.getDecks()[DeckType.PLAYER_2_MINIONS_IN_PLAY];

      enemyMovementGridDeck =
        deckContainer.getDecks()[DeckType.PLAYER_1_MINIONS_IN_PLAY];
    }

    const attackPhase = new AttackPhase(
      AttackPhaseState.INIT,
      mouseInput,
      enemyMovementGridDeck,
      currentPlayerMovementGridDeck,
      enemyMovementGrid,
      currentPlayerMovementGrid
    );

    return attackPhase;
  }

  execute() {
    let isPhaseFinished = false;

    let attacker;
    let target;
    switch (this._state) {
      // PHASE INITIALIZATION
      case AttackPhaseState.INIT:
        console.log("INIT");

        globals.currentPhase = PhaseType.ATTACK;
        // let message = new PhasesMessages(PhaseType.ATTACK,null,300)
        // console.log(message)
        // globals.phasesMessages.push(message.getContent(globals.currentPhase,"ENG"))

        this.#resetRelevantCardsStates([
          this.#enemyMovementGridDeck,
          this.#currentPlayerMovementGridDeck,
        ]);

        this._state = AttackPhaseState.SELECT_ATTACKER;

        break;

      // ATTACKER SELECTION
      case AttackPhaseState.SELECT_ATTACKER:
        console.log("ATTACKER SELECTION");

        attacker = this.#currentPlayerMovementGridDeck.lookForHoveredCard();

        if (attacker) {
          if (!attacker.isLeftClicked()) {
            attacker.setState(CardState.HOVERED);
          } else {
            console.log("ATTACKER SELECTED");

            attacker.setState(CardState.SELECTED);

            this._state = AttackPhaseState.SELECT_TARGET;
          }
        }

        break;

      // TARGET SELECTION
      case AttackPhaseState.SELECT_TARGET:
        console.log("TARGET SELECTION");

        attacker = this.#currentPlayerMovementGridDeck.lookForSelectedCard();

        if (attacker.isLeftClicked()) {
          console.log("ATTACKER DESELECTED");

          // THE PREVIOUSLY SELECTED ATTACKER WAS DESELECTED
          attacker.setState(CardState.PLACED);
          this._state = AttackPhaseState.SELECT_ATTACKER;
        } else {
          target = this.#enemyMovementGridDeck.lookForHoveredCard();
          if (target) {
            const attackerBox = attacker.getBoxIsPositionedIn(
              this.#currentPlayerMovementGrid,
              attacker
            );
            const targetBox = target.getBoxIsPositionedIn(
              this.#enemyMovementGrid,
              target
            );

            let isTargetWithinReach = this.#checkIfTargetIsWithinReach(
              attacker,
              attackerBox,
              targetBox
            );

            if (isTargetWithinReach) {
              if (!target.isLeftClicked()) {
                target.setState(CardState.HOVERED);
              } else {
                target.setState(CardState.SELECTED);
                this._state = AttackPhaseState.CALC_AND_APPLY_DMG;
              }
            }
          }
        }

        break;

      // CALCULATION AND APPLICATION OF DAMAGE
      case AttackPhaseState.CALC_AND_APPLY_DMG:
        console.log("CALC. & APPLICATION OF DMG");

        attacker = this.#currentPlayerMovementGridDeck.lookForSelectedCard();
        target = this.#enemyMovementGridDeck.lookForSelectedCard();

        const attackEvent = AttackEvent.create(
          attacker,
          target,
          this.#currentPlayerMovementGrid,
          this.#enemyMovementGrid
        );
        attackEvent.execute();

        this._state = AttackPhaseState.END;

        break;

      // PHASE END
      case AttackPhaseState.END:
        console.log("END");

        this.#updateDecks([
          this.#enemyMovementGridDeck,
          this.#currentPlayerMovementGridDeck,
        ]);

        isPhaseFinished = true;

        this._state = AttackPhaseState.INIT;

        break;
    }

    return isPhaseFinished;
  }

  #resetRelevantCardsStates(decks) {
    for (let i = 0; i < decks.length; i++) {
      const currentDeck = decks[i];

      for (let j = 0; j < currentDeck.getCards().length; j++) {
        const currentCard = currentDeck.getCards()[j];
        currentCard.setState(CardState.PLACED);
      }
    }
  }

  #checkIfTargetIsWithinReach(attacker, attackerBox, targetBox) {
    let isTargetWithinReach = false;

    if (
      !attacker.getWeapon() ||
      attacker.getMinionWeaponType() === WeaponType.MELEE
    ) {
      const targetMinXCoordinate =
        attackerBox.getXCoordinate() - 135 - attackerBox.getWidth();
      const targetMaxXCoordinate =
        attackerBox.getXCoordinate() + 135 + attackerBox.getWidth();

      let isYCoordinateLimitExceeded = true;
      if (
        this.#currentPlayerMovementGrid.getGridType() ===
        GridType.PLAYER_1_BATTLEFIELD
      ) {
        const targetMinYCoordinate =
          attackerBox.getYCoordinate() - 135 - attackerBox.getHeight();

        if (targetBox.getYCoordinate() >= targetMinYCoordinate) {
          isYCoordinateLimitExceeded = false;
        }
      } else {
        const targetMaxYCoordinate =
          attackerBox.getYCoordinate() + 135 + attackerBox.getHeight();

        if (targetBox.getYCoordinate() <= targetMaxYCoordinate) {
          isYCoordinateLimitExceeded = false;
        }
      }

      if (
        targetBox.getXCoordinate() >= targetMinXCoordinate &&
        targetBox.getXCoordinate() <= targetMaxXCoordinate &&
        !isYCoordinateLimitExceeded
      ) {
        isTargetWithinReach = true;
      }
    }

    return isTargetWithinReach;
  }

  #updateDecks(decksToCheck) {
    for (let i = 0; i < decksToCheck.length; i++) {
      const currentDeck = decksToCheck[i];

      for (let j = 0; j < currentDeck.getCards().length; j++) {
        const currentCard = currentDeck.getCards()[j];

        if (currentCard.getCurrentHP() === 0) {
          currentDeck.removeCard(currentCard);

          // MAKE THE BOX THE NOW DEAD MINION WAS POSITIONED IN AVAILABLE

          let gridWhereToLookForBox;
          if (currentDeck === this.#currentPlayerMovementGridDeck) {
            gridWhereToLookForBox = this.#currentPlayerMovementGrid;
          } else {
            gridWhereToLookForBox = this.#enemyMovementGrid;
          }

          const currentCardBox = currentCard.getBoxIsPositionedIn(
            gridWhereToLookForBox,
            currentCard
          );
          currentCardBox.resetCard();
        }
      }
    }
  }
}
