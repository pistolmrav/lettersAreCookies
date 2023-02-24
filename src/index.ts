import { CrumbsMap } from './map/map';
import { startTheJourney } from './journey';

const exampleMaps: Array<string> = [
  `
  @-A-+-B-x
    `,
];

const parsedMap = CrumbsMap.createCrumbsMapFromInputString(exampleMaps[0]);
startTheJourney(parsedMap);
