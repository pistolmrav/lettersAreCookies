import { Movement } from './movement/movement';
import { State } from './state/state';
import { CrumbsMap } from './map/map';
import { CrumbPosition } from './types';
import { START_SYMBOL } from './constants';
import { Direction } from './movement/direction';
import { startTheJourney } from './journey';

const exampleMaps: Array<string> = [
  `  
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
      `,
  `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
    `,
  `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
    `,
];

// Todo 1. Parse example Array<string> in a way we get each string item and split it into array of strings so that we can get y coord of the map
const parsedMap = CrumbsMap.createCrumbsMapFromInputString(exampleMaps[0]);
const crumbsMap = new CrumbsMap([
  '  ',
  ' @---A---+',
  '          |',
  '  x-B-+   |',
  '      |   |',
  '      +---C',
]);
// Todo 3. Find the start positions and get its coordinates
//const start = mapa.findSpecificCrumbOnMap(START_SYMBOL);
//console.log('Found start: ', start);
// Todo 4. Declare directions we can move to Up, Down, Left, Right
//const directions = Direction.getDirections();
//console.log('Directions: ', directions);

// Todo 4.5 Initialize our state so that our cookieMonster can have his breakfast - start the app
startTheJourney(crumbsMap);
// Todo 5. Find possible directions to move to from our currentPosition
//const possibleDirectionsToGoFromCurrentPosition =
// Direction.getAllPositonsPossibleFromCurrentPosition(start);
// Todo 6. Check validate each possible direction and filter the others
// Todo 7. Decide where to go next -> prioritize going straight unless we are at the turn sign: +
// Todo 8. Update the state with the new positions, update the path we went through and update the letters we have eaten
// Todo 9. Check if we are at the end: x, if so end the journey and prompt the user to go again
// Todo 10. If we are not at the end repeat from 5.
