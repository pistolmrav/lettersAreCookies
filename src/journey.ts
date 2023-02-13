import { CrumbsMap } from './map/map';
import { CrumbPosition } from './types';
import { State } from './state/state';
import { Direction } from './movement/direction';
import { DIRECTION_UP } from './constants';

export function startTheJourney(crumbsMap: CrumbsMap) {
  console.log('Our cookie monster wakes up and wants to have breakfast.');
  console.log(`Todays breakfast menu is: .${JSON.stringify(crumbsMap)}`);

  // Check if our breakfast has the complete meal
  const mapHasStartAndEnd: boolean = crumbsMap.checkIfMapHasStartAndEnd();
  if (!mapHasStartAndEnd) {
    throw new Error(
      'The menu isnt what the monster wanted. Please supply correct map.'
    );
  }

  console.log('Menu is ok! Find the appetizer.');
  const startPosition: CrumbPosition = crumbsMap.findSpecificCrumbOnMap('@');
  console.log('Start position: ', startPosition);

  // Initialize our state with startPosition and current map
  const state: State = State.getInitialState(crumbsMap, startPosition);
  if (!state) {
    throw new Error(
      'Failed to generate initial state. Check if you have a proper startingPosition and crumbsMap'
    );
  }

  console.log('Initial state: ', state);

  console.log(
    'Lets calculate all possible directions our monster can go from current position'
  );
  const possibleDirections: Direction[] =
    Direction.getAllDirectionsPossibleFromCurrentPosition(
      crumbsMap,
      startPosition
    );
  console.log('Possible directions: ', possibleDirections);
}
