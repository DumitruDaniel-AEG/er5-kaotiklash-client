const GameState = {
  INVALID: -1,
  PLAYING: 0,
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
  RARE_EVENTS_BIG: 2,
  SPECIAL_EVENTS_BIG: 3,
  MINIONS_WARRIORS_BIG: 4,
  MINIONS_WIZARDS_BIG: 5,
  MINIONS_SPECIAL_BIG: 6,
  JOSEPH_BIG: 7,
  MAIN_CHARACTERS_BIG: 8,
  ARMOR_MEDIUM_BIG: 9,
  ARMOR_LIGHT_HEAVY_BIG: 10,
  WEAPONS_BIG: 11,
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
  MINION_HP: 18,
  MINION_MADNESS: 19,
  MINION_ATTACK: 20,
  MINION_DEFENSE: 21,
  WEAPON_DAMAGE: 22,
  WEAPON_ARMOR_DURABILITY: 23,
  EVENT_PREP_TIME: 24,
  EVENT_EFFECT: 25,
  EVENT_DURATION: 26,
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
  INACTIVE: 0,
  MOVING: 1,
  PLACED: 2,
  INACTIVE_HOVERED: 3,
  HOVERED: 4,
  INACTIVE_SELECTED: 5,
  SELECTED: 6,
  EXPANDED: 7,
};

const BoxState = {
  INACTIVE: 0,
  AVAILABLE: 1,
  HOVERED: 2,
  SELECTED: 3,
  OCCUPIED: 4,
};

const AttackPhaseState = {
  INIT: 0,
  SELECT_ATTACKER: 1,
  SELECT_TARGET: 2,
  CALC_AND_APPLY_DMG: 3,
  END: 4,
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

const GridType = {
  EVENTS_DECK: 0,
  ACTIVE_EVENTS_TABLE: 1,
  JOSEPH: 2,
  MESSAGES: 3,
  PHASE_BUTTONS: 4,
  PLAYER_1_MAIN_CHARACTER: 5,
  PLAYER_1_MINIONS_DECK: 6,
  PLAYER_1_CARDS_IN_HAND: 7,
  PLAYER_1_BATTLEFIELD: 8,
  PLAYER_1_PREPARE_EVENT: 9,
  PLAYER_2_MAIN_CHARACTER: 10,
  PLAYER_2_MINIONS_DECK: 11,
  PLAYER_2_CARDS_IN_HAND: 12,
  PLAYER_2_BATTLEFIELD: 13,
  PLAYER_2_PREPARE_EVENT: 14,
};

const BattlefieldArea = {
  NONE: 0,
  REAR: 1,
  MIDDLE: 2,
  FRONT: 3,
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
  GridType,
  BattlefieldArea,
  AttackPhaseState,
  DiscardCardState,
  MovePhaseState,
  PrepareEventState,
  DrawCardState,
};
