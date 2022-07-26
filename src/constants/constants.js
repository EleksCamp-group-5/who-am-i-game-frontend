const WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS';
const SUGGESTING_CHARACTERS = 'SUGGEST_CHARACTER';
const PROCESSING_QUESTION = 'GAME_IN_PROGRESS';
const READY_TO_PLAY = 'READY_TO_PLAY';
const NUMBER_OF_PLAYERS = 4;
const READY = 'READY';
const NOT_READY = 'NOT_READY';
const ASKING = 'ASK_QUESTION';
const ANSWERING = 'ANSWER_QUESTION';
const FINISHED = 'FINISHED';
const YES = 'YES';
const NO = 'NO';
const NOT_SURE = 'NOT_SURE';
const GUESSING = 'GUESSING';
const ANSWER_GUESS = 'ANSWER_GUESS';
const WAITING = 'WAITING';
const RESPONSE = 'RESPONSE';
const DONT_KNOW = 'DONT_KNOW';

const MAIN_LOBBY = '/main-lobby';
const GAME_LOBBY = '/game-lobby';
const LOADING = '/loading';
const LOBBY = '/lobby';
const PLAY = '/play';
const DEFEAT = '/defeat';
const VICTORY = '/victory';
const INACTIVE = '/inactive';
const CREATE_ACCOUNT = '/create-account';
const SIGN_IN = '/sign-in';
const RESTORE = '/restore';
const NEW_PASSWORD = '/new-password';
const PROFILE = '/profile';

const THEME_FILTER = [
  { title: 'Actors', checked: false },
  { title: 'Astronauts', checked: false },
  { title: 'Superheroes', checked: false },
];
const NUMBER_OF_PLAYERS_FILTER = [
  { title: '4', checked: false },
  { title: '5', checked: false },
  { title: '6', checked: false },
  { title: '7', checked: false },
  { title: '8', checked: false },
  { title: '9', checked: false },
  { title: '10', checked: false },
  { title: '11', checked: false },
  { title: '12', checked: false },
];
const TYPE_FILTER = [
  { title: 'Public', checked: false },
  { title: 'Private', checked: false },
];

export {
  WAITING_FOR_PLAYERS,
  SUGGESTING_CHARACTERS,
  PROCESSING_QUESTION,
  NUMBER_OF_PLAYERS,
  READY,
  NOT_READY,
  ASKING,
  ANSWERING,
  FINISHED,
  YES,
  NO,
  NOT_SURE,
  GUESSING,
  WAITING,
  RESPONSE,
  MAIN_LOBBY,
  GAME_LOBBY,
  LOADING,
  LOBBY,
  PLAY,
  DEFEAT,
  VICTORY,
  INACTIVE,
  THEME_FILTER,
  NUMBER_OF_PLAYERS_FILTER,
  TYPE_FILTER,
  CREATE_ACCOUNT,
  SIGN_IN,
  RESTORE,
  NEW_PASSWORD,
  PROFILE,
  READY_TO_PLAY,
  ANSWER_GUESS,
  DONT_KNOW,
};
