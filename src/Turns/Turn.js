import InitialPhase from "./InitialPhase.js";
import DrawCardPhase from "./DrawCardPhase.js";
import AttackPhase from "./AttackPhase.js";
import MovePhase from "./MovePhase.js";
import PrepareEventPhase from "./PrepareEventPhase.js";
import PerformEventPhase from "./PerformEventPhase.js";
import DiscardCardPhase from "./DiscardCardPhase.js";
import {
  PlayerID,
  CardState,
  DeckType,
  PhaseType,
  PhaseButton,
  EquipWeaponState,
  CardCategory,
  GridType,
} from "../Game/constants.js";
import { globals } from "../index.js";
import EquipWeaponEvent from "../Events/EquipWeaponEvent.js";
import PhasesMessages from "../Messages/PhasesMessages.js";

export default class Turn {
  #isCurrentPhaseFinished;
  #currentPhase;
  #numOfExecutedPhases;
  #phases;
  #deckContainer;
  #board;
  #mouseInput;
  #player;
  #events;
  #equipWeaponState;

  constructor(deckContainer, board, mouseInput, player, events) {
    this.#isCurrentPhaseFinished = false;
    this.#currentPhase = PhaseType.INVALID;
    this.#numOfExecutedPhases = 0;
    this.#phases = [];
    this.#deckContainer = deckContainer;
    this.#board = board;
    this.#mouseInput = mouseInput;
    this.#player = player;
    this.#events = events;
    this.#equipWeaponState = EquipWeaponState.SELECT_WEAPON;
  }

  fillPhases(currentPlayer) {
    if (this.#player.getID() === PlayerID.PLAYER_1) {
      const initialPhase = new InitialPhase(this.#deckContainer);
      initialPhase.execute();
    }

    const phaseTypes = [
      DrawCardPhase,
      PrepareEventPhase,
      PerformEventPhase,
      MovePhase,
      AttackPhase,
      DiscardCardPhase,
    ];

    for (let i = 0; i < phaseTypes.length; i++) {
      const currentPhase = phaseTypes[i].create(
        this.#player,
        this.#deckContainer,
        this.#board,
        this.#mouseInput,
        this.#events,
        currentPlayer
      );

      this.#phases.push(currentPhase);
    }
  }

  changeTurn(currentPlayer) {
    globals.executedPhasesCount = 0;

    this.#numOfExecutedPhases = 0;

    /*   this.#swapTurnPosition(); */

    if (currentPlayer.getID() === PlayerID.PLAYER_1) {
      return PlayerID.PLAYER_2;
    } else {
      return PlayerID.PLAYER_1;
    }
  }

  #swapTurnPosition() {
    this.#swapDeckPosition();
    this.#swapGridPosition();
  }

  #swapDeckPosition() {
    const player1Decks = [
      this.#deckContainer.getDecks()[DeckType.PLAYER_1_MINIONS],
      this.#deckContainer.getDecks()[DeckType.PLAYER_1_ACTIVE_EVENTS],
      this.#deckContainer.getDecks()[DeckType.PLAYER_1_CARDS_IN_HAND],
      this.#deckContainer.getDecks()[DeckType.PLAYER_1_EVENTS_IN_PREPARATION],
      this.#deckContainer.getDecks()[DeckType.PLAYER_1_MAIN_CHARACTER],
      this.#deckContainer.getDecks()[DeckType.PLAYER_1_MINIONS_IN_PLAY],
    ];
    const player2Decks = [
      this.#deckContainer.getDecks()[DeckType.PLAYER_2_MINIONS],
      this.#deckContainer.getDecks()[DeckType.PLAYER_2_ACTIVE_EVENTS],
      this.#deckContainer.getDecks()[DeckType.PLAYER_2_CARDS_IN_HAND],
      this.#deckContainer.getDecks()[DeckType.PLAYER_2_EVENTS_IN_PREPARATION],
      this.#deckContainer.getDecks()[DeckType.PLAYER_2_MAIN_CHARACTER],
      this.#deckContainer.getDecks()[DeckType.PLAYER_2_MINIONS_IN_PLAY],
    ];

    //SWAP DECK POSITIONS FROM PLAYER 1 TO PLAYER 2 AND VICE VERSA
    for (let i = 0; i < player1Decks.length; i++) {
      this.#swapDeckPositions(player1Decks[i], player2Decks[i]);
    }
  }

  #swapDeckPositions(deckPlayer1, deckPlayer2) {
    for (let i = 0; i < deckPlayer1.getCards().length; i++) {
      for (let j = 0; j < deckPlayer2.getCards().length; j++) {
        const card1 = deckPlayer1.getCards()[i];
        const card2 = deckPlayer2.getCards()[j];
        const tempX = card1.getXCoordinate();
        const tempY = card1.getYCoordinate();

        if (card1 && card2) {
          //PLAYER 1 CARDS
          card1.setXCoordinate(card2.getXCoordinate());
          card1.setYCoordinate(card2.getYCoordinate());

          //PLAYER 2 CARDS
          card2.setXCoordinate(tempX);
          card2.setYCoordinate(tempY);
        }
      }
    }
  }

  #swapGridPosition() {
    const player1Grids = [
      this.#board.getGrids()[GridType.PLAYER_1_BATTLEFIELD],
      this.#board.getGrids()[GridType.PLAYER_1_CARDS_IN_HAND],
      this.#board.getGrids()[GridType.PLAYER_1_MAIN_CHARACTER],
      this.#board.getGrids()[GridType.PLAYER_1_MINIONS_DECK],
      this.#board.getGrids()[GridType.PLAYER_1_PREPARE_EVENT],
    ];

    const player2Grids = [
      this.#board.getGrids()[GridType.PLAYER_2_BATTLEFIELD],
      this.#board.getGrids()[GridType.PLAYER_2_CARDS_IN_HAND],
      this.#board.getGrids()[GridType.PLAYER_2_MAIN_CHARACTER],
      this.#board.getGrids()[GridType.PLAYER_2_MINIONS_DECK],
      this.#board.getGrids()[GridType.PLAYER_2_PREPARE_EVENT],
    ];

    for (let i = 0; i < player1Grids.length; i++) {
      this.#swapGridPositions(player1Grids[i], player2Grids[i]);
    }
  }

  #swapGridPositions(player1Grid, player2Grid) {
    for (let i = 0; i < player1Grid.getBoxes().length; i++) {
      for (let j = 0; j < player2Grid.getBoxes().length; j++) {
        const player1Box = player1Grid.getBoxes()[i];
        const player2Box = player2Grid.getBoxes()[j];
        const tempX = player1Box.getXCoordinate();
        const tempY = player1Box.getYCoordinate();

        //PLAYER 1 BOXES
        player1Box.setXCoordinate(player2Box.getXCoordinate());
        player1Box.setYCoordinate(player2Box.getYCoordinate());

        //PLAYER 2 BOXES
        player2Box.setXCoordinate(tempX);
        player2Box.setYCoordinate(tempY);
      }
    }
  }

  execute() {
    const isAnyCardExpanded = this.#expandCard();

    if (!isAnyCardExpanded) {
      if (this.#currentPhase === PhaseType.INVALID) {
        this.#equipWeapon();

        if (this.#equipWeaponState === EquipWeaponState.SELECT_WEAPON) {
          this.#checkButtonClick();
        }
      } else if (!this.#isCurrentPhaseFinished) {
        this.#isCurrentPhaseFinished =
          this.#phases[this.#currentPhase].execute();
      }

      if (this.#isCurrentPhaseFinished) {
        console.log("hloa")
        globals.phaseType = PhaseType.INVALID
        globals.currentPhase = PhaseType.INVALID;
        console.log(globals.phasesMessages)
        let message = new PhasesMessages(PhaseType.INVALID,null,300)

        globals.phasesMessages.push(message);
        console.log(globals.phasesMessages)
        console.log(globals.phasesMessages[0].getContent(globals.phaseType,"ENG"))

        this.#isCurrentPhaseFinished = false;
        this.#currentPhase = PhaseType.INVALID;
        this.#numOfExecutedPhases++;
        globals.executedPhasesCount++;
      }

      if (this.#numOfExecutedPhases === 3) {
        globals.isCurrentTurnFinished = true;
      }
    }
  }

  #expandCard() {
    const decksToCheck = [];

    if (this.#player.getID() === PlayerID.PLAYER_1) {
      decksToCheck.push(
        DeckType.PLAYER_1_ACTIVE_EVENTS,
        DeckType.PLAYER_1_CARDS_IN_HAND,
        DeckType.PLAYER_1_EVENTS_IN_PREPARATION,
        DeckType.PLAYER_1_MAIN_CHARACTER,
        DeckType.PLAYER_1_MINIONS_IN_PLAY
      );
    } else {
      decksToCheck.push(
        DeckType.PLAYER_2_ACTIVE_EVENTS,
        DeckType.PLAYER_2_CARDS_IN_HAND,
        DeckType.PLAYER_2_EVENTS_IN_PREPARATION,
        DeckType.PLAYER_2_MAIN_CHARACTER,
        DeckType.PLAYER_2_MINIONS_IN_PLAY
      );
    }

    decksToCheck.push(DeckType.JOSEPH);

    this.#lookForRightClickedCard(decksToCheck);

    const isAnyCardExpanded = this.#checkIfAnyCardIsExpanded(decksToCheck);
    return isAnyCardExpanded;
  }

  #lookForRightClickedCard(decksToCheck) {
    if (this.#mouseInput.isRightButtonPressed()) {
      this.#mouseInput.setRightButtonPressedFalse();

      const isAnyCardExpanded = this.#checkIfAnyCardIsExpanded(decksToCheck);

      for (let i = 0; i < this.#deckContainer.getDecks().length; i++) {
        for (let j = 0; j < decksToCheck.length; j++) {
          if (i === decksToCheck[j]) {
            const currentDeck = this.#deckContainer.getDecks()[i];

            const hoveredCard = currentDeck.lookForHoveredCard(
              this.#mouseInput
            );

            for (let k = 0; k < currentDeck.getCards().length; k++) {
              const currentCard = currentDeck.getCards()[k];

              if (currentCard === hoveredCard) {
                if (!isAnyCardExpanded) {
                  currentCard.setPreviousState(currentCard.getState());
                  currentCard.setState(CardState.EXPANDED);
                } else if (currentCard.getState() === CardState.EXPANDED) {
                  currentCard.setState(currentCard.getPreviousState());
                }
              }
            }
          }
        }
      }
    }
  }

  #checkIfAnyCardIsExpanded(decksToCheck) {
    for (let i = 0; i < this.#deckContainer.getDecks().length; i++) {
      for (let j = 0; j < decksToCheck.length; j++) {
        if (i === decksToCheck[j]) {
          const currentDeck = this.#deckContainer.getDecks()[i];

          const isAnyCardExpanded = currentDeck.checkIfAnyCardIsExpanded();

          if (isAnyCardExpanded) {
            return true;
          }
        }
      }
    }
  }

  #equipWeapon() {
    let playerXEventsInPreparationDeck, playerXMinionsInPlayDeck;

    if (this.#player.getID() === PlayerID.PLAYER_1) {
      playerXEventsInPreparationDeck =
        this.#deckContainer.getDecks()[DeckType.PLAYER_1_EVENTS_IN_PREPARATION];
      playerXMinionsInPlayDeck =
        this.#deckContainer.getDecks()[DeckType.PLAYER_1_MINIONS_IN_PLAY];
    } else {
      playerXEventsInPreparationDeck =
        this.#deckContainer.getDecks()[DeckType.PLAYER_2_EVENTS_IN_PREPARATION];
      playerXMinionsInPlayDeck =
        this.#deckContainer.getDecks()[DeckType.PLAYER_2_MINIONS_IN_PLAY];
    }

    // (¿?) MOVE TO THE BEGINNING OF THE execute() METHOD?
    const notHoveredCard = this.#lookForCardThatIsntHoveredAnymore([
      playerXEventsInPreparationDeck,
      playerXMinionsInPlayDeck,
    ]);
    if (notHoveredCard) {
      notHoveredCard.setState(CardState.PLACED);
    }

    let weapon;
    let minion;
    switch (this.#equipWeaponState) {
      // SELECT WEAPON TO EQUIP ON A MINION
      case EquipWeaponState.SELECT_WEAPON:
        console.log("WEAPON SELECTION");

        weapon = playerXEventsInPreparationDeck.lookForHoveredCard();

        if (weapon) {
          if (!weapon.isLeftClicked()) {
            weapon.setState(CardState.HOVERED);
          } else if (
            weapon.getCategory() === CardCategory.WEAPON &&
            weapon.getCurrentPrepTimeInRounds() /* === (!!!!!) TO UNCOMMENT BEFORE SHOWING DEMO */ >
              0
          ) {
            console.log("WEAPON SELECTED");

            weapon.setState(CardState.SELECTED);
            weapon.setIsLeftClicked(false);

            this.#equipWeaponState = EquipWeaponState.SELECT_MINION;
          }
        }

        break;

      // SELECT MINION TO EQUIP WEAPON ON
      case EquipWeaponState.SELECT_MINION:
        console.log("MINION SELECTION");

        weapon = playerXEventsInPreparationDeck.lookForSelectedCard();

        if (weapon.isLeftClicked()) {
          console.log("WEAPON DESELECTED");

          // THE PREVIOUSLY SELECTED WEAPON WAS DESELECTED
          weapon.setState(CardState.PLACED);
          this.#equipWeaponState = EquipWeaponState.SELECT_WEAPON;
        } else {
          minion = playerXMinionsInPlayDeck.lookForHoveredCard();

          if (minion) {
            if (!minion.isLeftClicked()) {
              minion.setState(CardState.HOVERED);
            } else if (!minion.getWeapon()) {
              minion.setState(CardState.SELECTED);
              this.#equipWeaponState = EquipWeaponState.EQUIP_WEAPON;
            }
          }
        }

        break;

      // PERFORM THE WEAPON EQUIPMENT
      case EquipWeaponState.EQUIP_WEAPON:
        console.log("WEAPON EQUIPMENT");

        weapon = playerXEventsInPreparationDeck.lookForSelectedCard();

        minion = playerXMinionsInPlayDeck.lookForSelectedCard();

        const equipWeaponEvent = new EquipWeaponEvent(weapon, minion);
        equipWeaponEvent.execute();

        this.#equipWeaponState = EquipWeaponState.END;

        break;

      // EVENT END
      case EquipWeaponState.END:
        console.log("EVENT END");

        weapon = playerXEventsInPreparationDeck.lookForSelectedCard();
        playerXEventsInPreparationDeck.removeCard(weapon);

        this.#equipWeaponState = EquipWeaponState.SELECT_WEAPON;

        break;
    }
  }

  #lookForCardThatIsntHoveredAnymore(decksToCheck) {
    for (let i = 0; i < decksToCheck.length; i++) {
      const currentDeck = decksToCheck[i];

      const notHoveredCard = currentDeck.lookForCardThatIsntHoveredAnymore();

      if (notHoveredCard) {
        return notHoveredCard;
      }
    }
  }

  #checkButtonClick() {
    const mouseX = this.#mouseInput.getMouseXCoordinate();
    const mouseY = this.#mouseInput.getMouseYCoordinate();

    if (this.#mouseInput.isLeftButtonPressed()) {
      for (let i = 0; i < globals.buttonDataGlobal.length; i++) {
        const buttonData = globals.buttonDataGlobal[i];

        const buttonXCoordinate = buttonData[0];
        const buttonYCoordinate = buttonData[1];
        const buttonWidth = buttonData[2];
        const buttonHeight = buttonData[3];

        if (
          mouseX >= buttonXCoordinate &&
          mouseX <= buttonXCoordinate + buttonWidth &&
          mouseY >= buttonYCoordinate &&
          mouseY <= buttonYCoordinate + buttonHeight
        ) {
          if (i === PhaseButton.SKIP) {
            // TODO: INSERT METHOD THAT SKIPS CURRENT PHASE
          } else {
            this.#currentPhase = i;
          }
        }
      }
    }
  }
}
