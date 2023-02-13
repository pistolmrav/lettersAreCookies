import { CrumbPosition } from '../types';
import { END_SYMBOL, START_SYMBOL } from '../constants';
import { isValidCrumb } from '../utils/utils';

export class CrumbsMap {
  constructor(private readonly lines: Array<string>) {}

  static createCrumbsMapFromInputString(inputString: string): CrumbsMap {
    return new CrumbsMap(inputString.split('\n'));
  }

  findSpecificCrumbOnMap(crumbSymbol: string): CrumbPosition {
    // Map through all the lines and find the exact symbol his coords are x: character positions in line, y: index of line in array
    const crumbPosition: CrumbPosition | undefined = this.lines.reduce(
      (acc: CrumbPosition | undefined, curr: string, currentIndex) => {
        if (curr.includes(crumbSymbol)) {
          return {
            ...acc,
            x: curr.indexOf(crumbSymbol),
            y: currentIndex,
          } as CrumbPosition;
        }

        return acc;
      },

      undefined
    );

    if (!crumbPosition) {
      throw new Error('Cookie monster could not find the crumb on the map!');
    }

    return crumbPosition;
  }

  // Todo not sure if we gonna need this function we'll see later on
  checkIfMapHasStartAndEnd(): boolean {
    const start: CrumbPosition = this.findSpecificCrumbOnMap(START_SYMBOL);
    const end: CrumbPosition = this.findSpecificCrumbOnMap(END_SYMBOL);

    return !(!start || !end);
  }

  isMapPositionValid(crumbPositon: CrumbPosition): boolean {
    const crumbAtPosition: string | undefined = this.lines[
      crumbPositon.y
    ].charAt(crumbPositon.x);
    return isValidCrumb(crumbAtPosition);
  }
}
