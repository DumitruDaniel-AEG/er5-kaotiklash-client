import MainCharacter from "./MainCharacter.js";
import Joseph from "./Joseph.js";
import Minion from "./Minion.js";
import Weapon from "./Weapon.js";
import Armor from "./Armor.js";
import Special from "./Special.js";
import Rare from "./Rare.js";
import { globals } from "../index.js";
import {
  Language,
  CardCategory,
  MainCharacterID,
  WeaponType,
  ArmorType,
} from "../Game/constants.js";

export default class CardFactory {
  #createMainCharacter(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;
    let rawCardSpecialSkill = rawCard.special_skill_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
      rawCardSpecialSkill = rawCard.special_skill_eus;
    }

    const processedCard = new MainCharacter(
      CardCategory.MAIN_CHARACTER,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      rawCardSpecialSkill
    );

    return processedCard;
  }

  #createJoseph(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;

    // SELECTION OF RANDOM CHAOTIC EVENT

    const chaoticEventID = Math.floor(Math.random() * 4);
    const gottenChaoticEvent =
      globals.cardsData.mainCharacters[MainCharacterID.JOSEPH].chaotic_events[
        chaoticEventID
      ];
    let chaoticEventName = gottenChaoticEvent.name_eng;
    let chaoticEventDescription = gottenChaoticEvent.description_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
      chaoticEventName = gottenChaoticEvent.name_eus;
      chaoticEventDescription = gottenChaoticEvent.description_eus;
    }

    const processedCard = new Joseph(
      CardCategory.MAIN_CHARACTER,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      chaoticEventID,
      chaoticEventName,
      chaoticEventDescription
    );

    return processedCard;
  }

  #createMinion(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;
    let rawCardTypeName = rawCard.category.name_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
      rawCardTypeName = rawCard.category.name_eus;
    }

    const processedCard = new Minion(
      CardCategory.MINION,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      rawCard.category_id - 1,
      rawCardTypeName,
      rawCard.hp,
      rawCard.madness,
      rawCard.strength,
      rawCard.attack,
      rawCard.constitution,
      rawCard.defense
    );

    return processedCard;
  }

  #createWeapon(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
    }

    let weaponType;
    if (rawCard.type_id === 1) {
      weaponType = WeaponType.MELEE;
    } else if (rawCard.type_id === 2) {
      weaponType = WeaponType.MISSILE;
    } else {
      weaponType = WeaponType.HYBRID;
    }

    const processedCard = new Weapon(
      CardCategory.WEAPON,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      weaponType,
      rawCard.damage,
      rawCard.durability,
      rawCard.prep_time_in_rounds
    );

    return processedCard;
  }

  #createArmor(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;
    let rawCardSpecialEffect = rawCard.special_effect_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
      rawCardSpecialEffect = rawCard.special_effect_eus;
    }

    let armorType;
    if (rawCard.type_id === 1) {
      armorType = ArmorType.LIGHT;
    } else if (rawCard.type_id === 2) {
      armorType = ArmorType.MEDIUM;
    } else {
      armorType = ArmorType.HEAVY;
    }

    const processedCard = new Armor(
      CardCategory.ARMOR,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      armorType,
      rawCardSpecialEffect,
      rawCard.durability,
      rawCard.prep_time_in_rounds
    );

    return processedCard;
  }

  #createSpecial(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;
    let rawCardEffect = rawCard.effect_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
      rawCardEffect = rawCard.effect_eus;
    }

    const processedCard = new Special(
      CardCategory.SPECIAL,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      rawCardEffect,
      rawCard.duration_in_rounds,
      rawCard.prep_time_in_rounds
    );

    return processedCard;
  }

  #createRare(rawCard) {
    let rawCardName = rawCard.name_eng;
    let rawCardDescription = rawCard.description_eng;
    let rawCardEffect = rawCard.effect_eng;

    if (globals.language === Language.BASQUE) {
      rawCardName = rawCard.name_eus;
      rawCardDescription = rawCard.description_eus;
      rawCardEffect = rawCard.effect_eus;
    }

    const processedCard = new Rare(
      CardCategory.RARE,
      rawCard.id - 1,
      rawCardName,
      rawCardDescription,
      rawCardEffect,
      rawCard.duration_in_rounds
    );

    return processedCard;
  }

  createCard(cardID, cardCategory) {
    let rawCard;
    let processedCard;

    switch (cardCategory) {
      case "main_characters":
        rawCard = globals.cardsData.mainCharacters[cardID];
        if (cardID !== MainCharacterID.JOSEPH) {
          processedCard = this.#createMainCharacter(rawCard);
        } else {
          processedCard = this.#createJoseph(rawCard);
        }
        break;

      case "minions":
        rawCard = globals.cardsData.minions[cardID];
        processedCard = this.#createMinion(rawCard);
        break;

      case "weapons":
        rawCard = globals.cardsData.weapons[cardID];
        processedCard = this.#createWeapon(rawCard);
        break;

      case "armor":
        rawCard = globals.cardsData.armor[cardID];
        processedCard = this.#createArmor(rawCard);
        break;

      case "special":
        rawCard = globals.cardsData.specialEvents[cardID];
        processedCard = this.#createSpecial(rawCard);
        break;

      case "rare":
        rawCard = globals.cardsData.rareEvents[cardID];
        processedCard = this.#createRare(rawCard);
        break;
    }

    return processedCard;
  }
}
