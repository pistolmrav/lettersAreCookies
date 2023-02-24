import { CrumbsMap } from './map/map';
import { startTheJourney } from './journey';

const exampleMaps: Array<string> = [
  `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+
    `,
];

const parsedMap = CrumbsMap.createCrumbsMapFromInputString(exampleMaps[0]);
startTheJourney(parsedMap);
