const GameState = {
  INVALID: -1,
  FAKE_CARDS_DISPLAY: 0,
};

// FPS (FRAMES PER SECOND)
const FPS = 30;

const Language = {
  ENGLISH: 0,
  BASQUE: 1,
};

const PlayerID = {
  PLAYER_1: 0,
  PLAYER_2: 1,
};

const TemplateID = {
  MAIN_CHARACTERS_SMALL: 0,
  MINIONS_AND_EVENTS_SMALL: 1,
};

const IconID = {
  ATTACK_DAMAGE_DIAMOND: 0,
  DEFENSE_DURABILITY_DIAMOND: 1,
  MINION_SPECIAL_TYPE: 2,
  MINION_WARRIOR_TYPE: 3,
  MINION_WIZARD_TYPE: 4,
  MINION_HP_DIAMOND: 5,
  EVENT_TYPE_CIRCLE: 6,
  EVENT_PREP_TIME_DIAMOND: 7,
  EVENT_DURATION_DIAMOND: 8,
  EVENT_EFFECT_DIAMOND: 9,
  WEAPON_MELEE_TYPE: 10,
  WEAPON_MISSILE_TYPE: 11,
  WEAPON_HYBRID_TYPE: 12,
  ARMOR_LIGHT_TYPE: 13,
  ARMOR_MEDIUM_TYPE: 14,
  ARMOR_HEAVY_TYPE: 15,
  SPECIAL_TYPE: 16,
  RARE_TYPE: 17,
};

const CardCategory = {
  MAIN_CHARACTER: 0,
  MINION: 1,
  ARMOR: 2,
  WEAPON: 3,
  SPECIAL: 4,
  RARE: 5,
};

const MinionType = {
  SPECIAL: 0,
  WARRIOR: 1,
  WIZARD: 2,
};

const WeaponType = {
  MELEE: 0,
  MISSILE: 1,
  HYBRID: 2,
};

const ArmorType = {
  LIGHT: 0,
  MEDIUM: 1,
  HEAVY: 2,
};

const DeckType = {
  EVENTS: 0,
  JOSEPH: 1,
  PLAYER_1_MAIN_CHARACTER: 2,
  PLAYER_1_CARDS_IN_HAND: 3,
  PLAYER_1_MINIONS: 4,
  PLAYER_1_MINIONS_IN_PLAY: 5,
  PLAYER_1_EVENTS_IN_PREPARATION: 6,
  PLAYER_1_ACTIVE_EVENTS: 7,
  PLAYER_2_MAIN_CHARACTER: 8,
  PLAYER_2_CARDS_IN_HAND: 9,
  PLAYER_2_MINIONS: 10,
  PLAYER_2_MINIONS_IN_PLAY: 11,
  PLAYER_2_EVENTS_IN_PREPARATION: 12,
  PLAYER_2_ACTIVE_EVENTS: 13,
  MAIN: 14,
};

const MainCharacterID = {
  LUCRETIA: 0,
  ANGELO_DI_MORTIS: 1,
  THE_ERUDITE_XG: 2,
  THE_DECREPIT_THRONE: 3,
  JOSEPH: 4,
};

const ChaoticEventID = {
  LIGHTNING_STORM: 0,
  SANDSTORM: 1,
  MINION_REBELLION: 2,
  CONSTANT_SWAP: 3,
};

const CardState = {
  NOT_SELECTED: 0,
  MOVING: 1,
  PLACED: 2,
  SELECTED: 3,
  HOVERED: 4,
  DISCARDED: 5,
};

const BoxState = {
  EMPTY: 0,
  AVARIABLE: 1,
  HOVERED: 2,
  SELECTED: 3,
  OCCUPIED: 4,
};

const DiscardCardState = {
  INIT: 0,
  SELECT_CARD_TO_DISCARD: 1,
  END: 2,
};

const MovePhaseState = {
  INIT: 0,
  SELECT_CARD: 1,
  SELECT_TARGET: 2,
  MOVE_CARD: 3,
  END: 4,
};

const PrepareEventState = {
  INIT: 0,
  SELECT_HAND_CARD: 1,
  SELECT_TARGET_GRID: 2,
  END: 3,
};

const DrawCardState = {
  INIT: 0,
  DRAW_CARD: 1,
  END: 2,
};

export {
  GameState,
  FPS,
  Language,
  PlayerID,
  TemplateID,
  IconID,
  CardCategory,
  MinionType,
  WeaponType,
  ArmorType,
  DeckType,
  MainCharacterID,
  ChaoticEventID,
  CardState,
  BoxState,
  DiscardCardState,
  MovePhaseState,
  PrepareEventState,
  DrawCardState,
};
