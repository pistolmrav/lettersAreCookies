import { CrumbsMap } from './map/map';
import { startTheJourney } from './journey';

const exampleMaps: Array<string> = [
  `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
    `,
];

const parsedMap = CrumbsMap.createCrumbsMapFromInputString(exampleMaps[0]);
startTheJourney(parsedMap);
