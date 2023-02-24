import { CrumbPosition } from './types';

export const START_SYMBOL = '@';
export const END_SYMBOL = 'x';
export const DIRECTION_UP = 'UP';
export const DIRECTION_DOWN = 'DOWN';
export const DIRECTION_LEFT = 'LEFT';
export const DIRECTION_RIGHT = 'RIGHT';

export const MULTIPLE_START_SYMBOLS_ERROR =
  'Multiple starting positions found. There should be only one starting position.';
export const NO_START_SYMBOL_ERROR =
  'No starting position found. There should be one starting position.';
export const NO_END_SYMBOL_ERROR =
  'No end position found. There should be one end position.';
export const FAILED_TO_GENERATE_INITIAL_STATE_ERROR =
  'Failed to generate initial state. Check if you have a proper startingPosition and crumbsMap';
export const NO_NEXT_DIRECTION_ERROR =
  'Error finding the path for monster to go.';

export const FAKE_TURN_ERROR = "Fake turn. Monster can't go anywhere.";
export const BROKEN_PATH_ERROR = "Broken path. Monster can't go anywhere.";

export const MULTIPLE_STARTING_PATHS_ERROR =
  'Multiple starting paths. The monster cant decide where to go';

export const FORK_IN_PATH_ERROR =
  'Fork in path. The monster cant decide where to go';

export const NOTHING_TO_EAT_ERROR = (position: CrumbPosition) =>
  `Nothing to eat at ${position}! You made monster hangry!`;
