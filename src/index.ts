import { Movement } from './movement/movement';
import { State } from './state/state';
import { CrumbsMap } from './map/map';
import { CrumbPosition } from './types';

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

console.log('Hell man! Lets start searching for the crumbs');
// Todo 1. Parse example Array<string> in a way we get each string item and split it into array of strings so that we can get y coord of the map
const parsedMap = CrumbsMap.createCrumbsMapFromInputString(exampleMaps[0]);
// Todo 2. Check if each item is valid -> it has both start and end character @ & x
const mapa = new CrumbsMap([
  '  ',
  ' @---A---+',
  '          |',
  '  x-B-+   |',
  '      |   |',
  '      +---C',
]);
const start = mapa.findSpecificCrumbOnMap('@');
console.log('Found start: ', start);
// Todo 3. Find the start position and get its coordinates
// Todo 4. Declare directions we can move to Up, Down, Left, Right
// Todo 5. Find possible directions to move to from our currentPosition
// Todo 6. Check validate each possible direction and filter the others
// Todo 7. Decide where to go next -> prioritize going straight unless we are at the turn sign: +
// Todo 8. Update the state with the new position, update the path we went through and update the letters we have eaten
// Todo 9. Check if we are at the end: x, if so end the journey and prompt the user to go again
// Todo 10. If we are not at the end repeat from 5.
