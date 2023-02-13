import { CrumbsMap } from './map/map';
import { CrumbPosition } from './types';
import { State } from './state/state';
import { Direction } from './movement/direction';
import { DIRECTION_UP } from './constants';

export function startTheJourney(crumbsMap: CrumbsMap) {
  // Todo handle case where multiple start symbols are found
  // Check if our breakfast has the complete meal
  const mapHasStartAndEnd: boolean = crumbsMap.checkIfMapHasStartAndEnd();
  if (!mapHasStartAndEnd) {
    throw new Error(
      'The menu isnt what the monster wanted. Please supply correct map.'
    );
  }

  const startPosition: CrumbPosition = crumbsMap.findSpecificCrumbOnMap('@');
  console.log('Start position: ', startPosition);
  console.log(
    'Crumb at start position: ',
    crumbsMap.getCrumbAtPosition(startPosition)
  );

  // Initialize our state with startPosition and current map
  let state: State = State.getInitialState(crumbsMap, startPosition);
  console.log('Initial state: ', state);
  if (!state) {
    throw new Error(
      'Failed to generate initial state. Check if you have a proper startingPosition and crumbsMap'
    );
  }
  // Make monster eat first crumb
  state.eatCrumbAtPosition(startPosition);

  let i = 0;
  while (i < 50) {
    i++;
    const nextDirection: Direction | undefined = Direction.getNextDirection(
      crumbsMap,
      state,
      []
    );

    if (!nextDirection) {
      throw new Error('Error finding the path for monster to go.');
    }

    state.currentDirection = nextDirection;

    const nextPosition: CrumbPosition = {
      x: state.currentPosition.x + nextDirection.xCord,
      y: state.currentPosition.y + nextDirection.yCord,
    };

    const eatenCrumb = state.eatCrumbAtPosition(nextPosition);
    console.log('State: ', state);
    if (eatenCrumb === 'x') {
      return;
    }
  }
  /*while (i < 9) {
    i++;
    const possibleDirections: Direction[] =
      Direction.getAllDirectionsPossibleFromCurrentPosition(
        crumbsMap,
        startPosition
      );
    // Decide which position we should go
    // First follow the -, then follow + or letter then follow pipe
    // Make monster eat the second crumb
    const nextDirection: Direction | undefined = Direction.getNextDirection(
      crumbsMap,
      state,
      possibleDirections
    );

    if (!nextDirection) {
      throw new Error('Error finding the path for monster to go.');
    }

    state.currentDirection = nextDirection;
    const nextPosition: CrumbPosition = {
      x: state.currentPosition.x + nextDirection.xCord,
      y: state.currentPosition.y + nextDirection.yCord,
    };

    state.eatCrumbAtPosition(nextPosition);
  }*/
}
