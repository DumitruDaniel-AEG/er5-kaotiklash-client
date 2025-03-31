import { CardCategory, CardState, BoxState } from "./constants.js";
import { globals } from "../index.js";

export default class MouseInput {
  #mouseXCoordinate;
  #mouseYCoordinate;
  #leftButtonPressed;
  #rightButtonPressed;

  constructor() {
    this.#mouseXCoordinate = 0;
    this.#mouseYCoordinate = 0;
    this.#leftButtonPressed = false;
    this.#rightButtonPressed = false;
  }

  addMouseEventListeners() {
    window.addEventListener("contextmenu", function (event) {
      // DISABLE THE CONTEXT-MENU FOR THE WHOLE PAGE
      event.preventDefault();
    });

    globals.canvas.addEventListener(
      "mousedown",
      this.canvasMouseDownHandler.bind(this),
      false
    );

    globals.canvas.addEventListener(
      "mouseup",
      this.canvasMouseUpHandler.bind(this),
      false
    );

    globals.canvas.addEventListener(
      "mousemove",
      this.canvasMouseMoveHandler.bind(this),
      false
    );
  }

  canvasMouseDownHandler(event) {
    if (event.button === 0) {
      this.#leftButtonPressed = true;
    } else if (event.button === 2) {
      this.#rightButtonPressed = true;
    }
  }

  canvasMouseUpHandler(event) {
    if (event.button === 0) {
      this.#leftButtonPressed = false;
    } else if (event.button === 2) {
      this.#rightButtonPressed = false;
    }
  }

  canvasMouseMoveHandler(event) {
    //FIND THE MOUSE'S X AND Y POSITIONS ON THE CANVAS
    this.#mouseXCoordinate = event.pageX - globals.canvas.offsetLeft;
    this.#mouseYCoordinate = event.pageY - globals.canvas.offsetTop;
  }

  getMouseXCoordinate() {
    return this.#mouseXCoordinate;
  }

  getMouseYCoordinate() {
    return this.#mouseYCoordinate;
  }

  isLeftButtonPressed() {
    return this.#leftButtonPressed;
  }

  isRightButtonPressed() {
    return this.#rightButtonPressed;
  }

  setLeftButtonPressedFalse() {
    this.#leftButtonPressed = false;
  }

  setRightButtonPressedFalse() {
    this.#rightButtonPressed = false;
  }

  isMouseOverBox(box) {
    const boxX = box.getXCoordinate();
    const boxY = box.getYCoordinate();
    const boxWidth = box.getWidth();
    const boxHeight = box.getHeight();

    const isOverBox =
      this.getMouseXCoordinate() >= boxX &&
      this.getMouseXCoordinate() <= boxX + boxWidth &&
      this.getMouseYCoordinate() >= boxY &&
      this.getMouseYCoordinate() <= boxY + boxHeight;

    return isOverBox;
  }

  detectMouseOverBox(boxes) {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (this.isMouseOverBox(box)) {
        box.setIsMouseOver(true);
        if (box.getState() === BoxState.INACTIVE) {
          box.setState(BoxState.INACTIVE_HOVERED);
        } else if (box.getState() === BoxState.AVAILABLE) {
          box.setState(BoxState.HOVERED);
        }
      }
    }
  }

  detectBoxThatIsntHoveredAnymore(boxes) {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (!this.isMouseOverBox(box) && box.isMouseOver()) {
        box.setIsMouseOver(false);
        if (box.getState() === BoxState.INACTIVE_HOVERED) {
          box.setState(BoxState.INACTIVE);
        } else if (box.getState() === BoxState.HOVERED) {
          box.setState(BoxState.AVAILABLE);
        }
      }
    }
  }

  detectLeftClickOnBox(boxes) {
    if (this.isLeftButtonPressed()) {
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        if (box.isMouseOver()) {
          box.setIsLeftClicked(true);
          if (box.getState() === BoxState.HOVERED) {
            box.setState(BoxState.SELECTED);
          }
        }
      }
      this.setLeftButtonPressedFalse();
    }
  }

  detectMouseOverCard(deckContainer) {
    for (let i = 0; i < deckContainer.getDecks().length; i++) {
      const currentDeck = deckContainer.getDecks()[i];

      for (let j = 0; j < currentDeck.getCards().length; j++) {
        const currentCard = currentDeck.getCards()[j];

        const [isMouseWithinCardWidth, isMouseWithinCardHeight] =
          this.#checkIfMouseWithinCardWidthAndHeight(currentCard);

        if (isMouseWithinCardWidth && isMouseWithinCardHeight) {
          currentCard.setIsMouseOver(true);
        }
      }
    }
  }

  #checkIfMouseWithinCardWidthAndHeight(card) {
    let cardWidth = globals.imagesDestinationSizes.allCardsBigVersion.width;
    let cardHeight = globals.imagesDestinationSizes.allCardsBigVersion.height;

    let cardXCoordinate = globals.canvas.width / 2 - cardWidth / 2;
    let cardYCoordinate = globals.canvas.height / 2 - cardHeight / 2;

    if (card.getState() !== CardState.EXPANDED) {
      if (card.getCategory() === CardCategory.MAIN_CHARACTER) {
        cardWidth =
          globals.imagesDestinationSizes.mainCharactersSmallVersion.width;
        cardHeight =
          globals.imagesDestinationSizes.mainCharactersSmallVersion.height;
      } else {
        cardWidth =
          globals.imagesDestinationSizes.minionsAndEventsSmallVersion.width;
        cardHeight =
          globals.imagesDestinationSizes.minionsAndEventsSmallVersion.height;
      }

      cardXCoordinate = card.getXCoordinate();
      cardYCoordinate = card.getYCoordinate();
    }

    const isMouseWithinCardWidth =
      this.getMouseXCoordinate() >= cardXCoordinate &&
      this.getMouseXCoordinate() <= cardXCoordinate + cardWidth;

    const isMouseWithinCardHeight =
      this.getMouseYCoordinate() >= cardYCoordinate &&
      this.getMouseYCoordinate() <= cardYCoordinate + cardHeight;

    return [isMouseWithinCardWidth, isMouseWithinCardHeight];
  }

  detectCardThatIsntHoveredAnymore(deckContainer) {
    for (let i = 0; i < deckContainer.getDecks().length; i++) {
      const currentDeck = deckContainer.getDecks()[i];

      for (let j = 0; j < currentDeck.getCards().length; j++) {
        const currentCard = currentDeck.getCards()[j];

        const [isMouseWithinCardWidth, isMouseWithinCardHeight] =
          this.#checkIfMouseWithinCardWidthAndHeight(currentCard);

        if (
          (!isMouseWithinCardWidth || !isMouseWithinCardHeight) &&
          currentCard.isMouseOver()
        ) {
          currentCard.setIsMouseOver(false);
        }
      }
    }
  }

  resetIsLeftClicked(deckContainer) {
    for (let i = 0; i < deckContainer.getDecks().length; i++) {
      const currentDeck = deckContainer.getDecks()[i];

      const leftClickedCard = currentDeck.lookForLeftClickedCard();

      if (leftClickedCard) {
        // SET "isLeftClicked" TO FALSE ON THE CARD THAT WAS LEFT-CLICKED IN THE PREVIOUS CYCLE
        leftClickedCard.setIsLeftClicked(false);
      }
    }
  }

  detectLeftClickOnCard(deckContainer) {
    if (this.isLeftButtonPressed()) {
      for (let i = 0; i < deckContainer.getDecks().length; i++) {
        const currentDeck = deckContainer.getDecks()[i];

        const hoveredCard = currentDeck.lookForHoveredCard();

        for (let j = 0; j < currentDeck.getCards().length; j++) {
          const currentCard = currentDeck.getCards()[j];

          if (currentCard === hoveredCard) {
            currentCard.setIsLeftClicked(true);
          }
        }
      }

      this.setLeftButtonPressedFalse();
    }
  }
}
